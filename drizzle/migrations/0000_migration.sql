CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','staff'))
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code text NOT NULL UNIQUE,
  user_id uuid,
  branch text NOT NULL CHECK (branch IN ('medipally','ghatkesar')),
  doctor text NOT NULL DEFAULT 'Dr. Sanjay Kompally',
  service text NOT NULL DEFAULT 'General Consultation',
  visit_type text NOT NULL DEFAULT 'in_clinic' CHECK (visit_type IN ('in_clinic','video','home_visit','walkin')),
  appt_date date NOT NULL,
  appt_time text NOT NULL,
  patient_name text NOT NULL,
  phone text NOT NULL,
  age int,
  gender text,
  reason text,
  status text NOT NULL DEFAULT 'booked' CHECK (status IN ('booked','completed','cancelled','no_show')),
  token_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own or staff read appointments" ON public.appointments FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Staff update appointments" ON public.appointments FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Owner cancels appointment" ON public.appointments FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid() AND status = 'cancelled');

CREATE TABLE public.tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch text NOT NULL CHECK (branch IN ('medipally','ghatkesar')),
  token_date date NOT NULL,
  token_number int NOT NULL,
  status text NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting','called','in_consultation','done','skipped')),
  source text NOT NULL DEFAULT 'online',
  priority boolean NOT NULL DEFAULT false,
  called_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (branch, token_date, token_number)
);
GRANT SELECT ON public.tokens TO anon;
GRANT SELECT, UPDATE ON public.tokens TO authenticated;
GRANT ALL ON public.tokens TO service_role;
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view queue" ON public.tokens FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff update tokens" ON public.tokens FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
ALTER PUBLICATION supabase_realtime ADD TABLE public.tokens;

CREATE TABLE public.lab_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code text NOT NULL UNIQUE,
  user_id uuid,
  branch text NOT NULL CHECK (branch IN ('medipally','ghatkesar')),
  tests text[] NOT NULL,
  collection text NOT NULL CHECK (collection IN ('branch','home')),
  address text,
  pref_date date NOT NULL,
  slot text NOT NULL,
  patient_name text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','confirmed','collected','reported','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.lab_orders TO authenticated;
GRANT ALL ON public.lab_orders TO service_role;
ALTER TABLE public.lab_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own or staff read lab orders" ON public.lab_orders FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Staff update lab orders" ON public.lab_orders FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.ist_today() RETURNS date LANGUAGE sql STABLE AS $$ SELECT (now() AT TIME ZONE 'Asia/Kolkata')::date $$;

CREATE OR REPLACE FUNCTION public.next_token(p_branch text, p_date date, p_source text)
RETURNS public.tokens LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t public.tokens; n int;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(p_branch || p_date::text));
  SELECT coalesce(max(token_number),0)+1 INTO n FROM public.tokens WHERE branch = p_branch AND token_date = p_date;
  INSERT INTO public.tokens(branch, token_date, token_number, source) VALUES (p_branch, p_date, n, p_source) RETURNING * INTO t;
  RETURN t;
END $$;
REVOKE EXECUTE ON FUNCTION public.next_token(text, date, text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.validate_patient(p_name text, p_phone text) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  IF p_name IS NULL OR length(trim(p_name)) < 2 OR length(p_name) > 100 THEN RAISE EXCEPTION 'Please enter a valid name'; END IF;
  IF p_phone !~ '^[6-9][0-9]{9}$' THEN RAISE EXCEPTION 'Please enter a valid 10 digit mobile number'; END IF;
END $$;

CREATE OR REPLACE FUNCTION public.book_appointment(
  p_branch text, p_service text, p_visit_type text, p_date date, p_time text,
  p_name text, p_phone text, p_age int, p_gender text, p_reason text)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t public.tokens; a_id uuid; code text; cnt int;
BEGIN
  PERFORM public.validate_patient(p_name, p_phone);
  IF p_branch NOT IN ('medipally','ghatkesar') THEN RAISE EXCEPTION 'Unknown branch'; END IF;
  IF p_visit_type NOT IN ('in_clinic','video','home_visit') THEN RAISE EXCEPTION 'Unknown visit type'; END IF;
  IF p_date < public.ist_today() OR p_date > public.ist_today() + 30 THEN RAISE EXCEPTION 'Please choose a date within the next 30 days'; END IF;
  IF p_time !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' THEN RAISE EXCEPTION 'Invalid time'; END IF;
  IF length(coalesce(p_reason,'')) > 500 OR length(coalesce(p_service,'')) > 120 THEN RAISE EXCEPTION 'Text too long'; END IF;
  SELECT count(*) INTO cnt FROM public.appointments WHERE branch = p_branch AND appt_date = p_date AND appt_time = p_time AND status = 'booked';
  IF cnt >= 3 THEN RAISE EXCEPTION 'This time slot is full, please pick another'; END IF;
  t := public.next_token(p_branch, p_date, 'online');
  code := 'AV' || to_char(p_date,'DDMM') || upper(substr(md5(random()::text),1,4));
  INSERT INTO public.appointments(booking_code, user_id, branch, service, visit_type, appt_date, appt_time, patient_name, phone, age, gender, reason, token_id)
  VALUES (code, auth.uid(), p_branch, coalesce(nullif(trim(p_service),''),'General Consultation'), p_visit_type, p_date, p_time, trim(p_name), p_phone, p_age, p_gender, p_reason, t.id)
  RETURNING id INTO a_id;
  RETURN json_build_object('booking_code', code, 'token_number', t.token_number, 'token_id', t.id, 'appointment_id', a_id);
END $$;

CREATE OR REPLACE FUNCTION public.get_walkin_token(p_branch text, p_name text, p_phone text)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t public.tokens; code text; cnt int;
BEGIN
  PERFORM public.validate_patient(p_name, p_phone);
  IF p_branch NOT IN ('medipally','ghatkesar') THEN RAISE EXCEPTION 'Unknown branch'; END IF;
  SELECT count(*) INTO cnt FROM public.tokens WHERE branch = p_branch AND token_date = public.ist_today() AND source = 'walkin_online' AND status = 'waiting';
  IF cnt >= 40 THEN RAISE EXCEPTION 'Online tokens are full for now, please visit reception'; END IF;
  t := public.next_token(p_branch, public.ist_today(), 'walkin_online');
  code := 'AW' || to_char(public.ist_today(),'DDMM') || upper(substr(md5(random()::text),1,4));
  INSERT INTO public.appointments(booking_code, user_id, branch, visit_type, appt_date, appt_time, patient_name, phone, token_id)
  VALUES (code, auth.uid(), p_branch, 'walkin', public.ist_today(), to_char(now() AT TIME ZONE 'Asia/Kolkata','HH24:MI'), trim(p_name), p_phone, t.id);
  RETURN json_build_object('booking_code', code, 'token_number', t.token_number, 'token_id', t.id);
END $$;

CREATE OR REPLACE FUNCTION public.staff_add_token(p_branch text, p_name text, p_phone text, p_priority boolean)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t public.tokens; code text;
BEGIN
  IF NOT public.is_staff(auth.uid()) THEN RAISE EXCEPTION 'Not allowed'; END IF;
  t := public.next_token(p_branch, public.ist_today(), 'reception');
  UPDATE public.tokens SET priority = coalesce(p_priority,false) WHERE id = t.id;
  code := 'AR' || to_char(public.ist_today(),'DDMM') || upper(substr(md5(random()::text),1,4));
  INSERT INTO public.appointments(booking_code, branch, visit_type, appt_date, appt_time, patient_name, phone, token_id)
  VALUES (code, p_branch, 'walkin', public.ist_today(), to_char(now() AT TIME ZONE 'Asia/Kolkata','HH24:MI'), coalesce(nullif(trim(p_name),''),'Walk-in'), coalesce(p_phone,''), t.id);
  RETURN json_build_object('token_number', t.token_number, 'token_id', t.id);
END $$;

CREATE OR REPLACE FUNCTION public.booked_slots(p_branch text, p_date date)
RETURNS TABLE(appt_time text, booked int) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT appt_time, count(*)::int FROM public.appointments
  WHERE branch = p_branch AND appt_date = p_date AND status = 'booked' AND visit_type <> 'walkin'
  GROUP BY appt_time
$$;

CREATE OR REPLACE FUNCTION public.create_lab_order(
  p_branch text, p_tests text[], p_collection text, p_address text, p_date date, p_slot text, p_name text, p_phone text)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE code text;
BEGIN
  PERFORM public.validate_patient(p_name, p_phone);
  IF p_branch NOT IN ('medipally','ghatkesar') THEN RAISE EXCEPTION 'Unknown branch'; END IF;
  IF p_collection NOT IN ('branch','home') THEN RAISE EXCEPTION 'Unknown collection type'; END IF;
  IF p_collection = 'home' AND length(coalesce(trim(p_address),'')) < 8 THEN RAISE EXCEPTION 'Please enter your full address for home collection'; END IF;
  IF array_length(p_tests,1) IS NULL OR array_length(p_tests,1) > 20 THEN RAISE EXCEPTION 'Please choose between 1 and 20 tests'; END IF;
  IF p_date < public.ist_today() OR p_date > public.ist_today() + 30 THEN RAISE EXCEPTION 'Please choose a date within the next 30 days'; END IF;
  code := 'AL' || to_char(p_date,'DDMM') || upper(substr(md5(random()::text),1,4));
  INSERT INTO public.lab_orders(order_code, user_id, branch, tests, collection, address, pref_date, slot, patient_name, phone)
  VALUES (code, auth.uid(), p_branch, p_tests, p_collection, p_address, p_date, left(p_slot,40), trim(p_name), p_phone);
  RETURN json_build_object('order_code', code);
END $$;

GRANT EXECUTE ON FUNCTION public.book_appointment(text,text,text,date,text,text,text,int,text,text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_walkin_token(text,text,text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.booked_slots(text,date) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_lab_order(text,text[],text,text,date,text,text,text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.staff_add_token(text,text,text,boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.ist_today() TO anon, authenticated;