export type BranchId = "medipally" | "ghatkesar";

export const BRANCHES: Record<
  BranchId,
  { id: BranchId; name: string; short: string; address: string; phone: string; tel: string; rating: string; reviews: number; maps: string; embed: string }
> = {
  medipally: {
    id: "medipally",
    name: "Avica Polyclinic and Diagnostics, Medipally",
    short: "Medipally",
    address: "Shop No 1-105, Medipalli Kaman, opposite Saibaba Temple, Medipally, Hyderabad, Telangana 500098",
    phone: "080085 60333",
    tel: "+918008560333",
    rating: "4.9",
    reviews: 15,
    maps: "https://www.google.com/maps/search/?api=1&query=Avica+Polyclinic+And+Diagnostics+Medipally+Hyderabad",
    embed: "https://www.google.com/maps?q=Avica+Polyclinic+And+Diagnostics+Medipally+Hyderabad&output=embed",
  },
  ghatkesar: {
    id: "ghatkesar",
    name: "Avica Polyclinic Diagnostics and Medicals, Ghatkesar",
    short: "Ghatkesar",
    address: "Ghatkesar, Hyderabad, Telangana",
    phone: "083400 02340",
    tel: "+918340002340",
    rating: "5.0",
    reviews: 5,
    maps: "https://www.google.com/maps/search/?api=1&query=Avica+Polyclinic+Diagnostics+Medicals+Ghatkesar",
    embed: "https://www.google.com/maps?q=Avica+Polyclinic+Diagnostics+Medicals+Ghatkesar&output=embed",
  },
};
export const BRANCH_LIST = Object.values(BRANCHES);

export const WHATSAPP = "https://wa.me/918008560333";

export const DOCTOR = {
  name: "Dr. Sanjay Kompally",
  qualification: "MBBS",
  reg: "Reg. No. 18190",
  speciality: "General Physician",
  experience: "7+ years",
  fee: 200,
  languages: ["English", "Telugu", "Hindi"],
  timings: "Mon to Sun, 6:00 AM to 1:00 PM and 2:00 PM to 11:45 PM",
};

export const CLINIC_HOURS = "Mon to Sun, 5:30 AM to 1:00 PM and 2:00 PM to 11:55 PM";

export const SPECIALITIES = [
  "General Medicine",
  "Headache and Vertigo",
  "Orthopedics",
  "Dermatology",
  "Cosmetology",
  "Pediatrics",
  "Physiotherapy",
  "Neurotology",
  "Palliative Care",
  "Aesthetic Medicine",
] as const;

export type Treatment = { slug: string; name: string; category: (typeof SPECIALITIES)[number]; summary: string; helps: string[] };

const t = (name: string, category: Treatment["category"], summary: string, helps: string[]): Treatment => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name,
  category,
  summary,
  helps,
});

export const TREATMENTS: Treatment[] = [
  t("Fever Management", "General Medicine", "Careful assessment of the cause of fever, with tests when needed and a clear recovery plan.", ["High temperature", "Body pain", "Chills"]),
  t("Viral Fever Treatment", "General Medicine", "Supportive care for viral infections, hydration guidance and monitoring for dengue or typhoid signs.", ["Viral fever", "Weakness", "Headache"]),
  t("Cough Management", "General Medicine", "Treatment for acute and long-standing cough, including allergy and infection related cough.", ["Dry cough", "Wet cough", "Throat irritation"]),
  t("Cold", "General Medicine", "Relief for common cold and seasonal infections, with advice to prevent spread at home.", ["Runny nose", "Sneezing", "Sore throat"]),
  t("Gastrointestinal Disorders", "General Medicine", "Diagnosis and care for stomach and digestive problems.", ["Acidity", "Loose motions", "Constipation"]),
  t("Gastric", "General Medicine", "Treatment for gas, bloating and acidity with diet and lifestyle guidance.", ["Bloating", "Acidity", "Indigestion"]),
  t("Ulcer", "General Medicine", "Evaluation and treatment of stomach and mouth ulcers.", ["Burning pain", "Nausea", "Mouth sores"]),
  t("Hypertension", "General Medicine", "Blood pressure checks, long-term control plans and regular follow up.", ["High BP", "Headaches", "Dizziness"]),
  t("Diabetic Diet Counselling", "General Medicine", "Practical, local food plans to help control blood sugar.", ["Type 2 diabetes", "Pre-diabetes", "Weight control"]),
  t("Sexual Problems", "General Medicine", "Private, respectful consultation for sexual health concerns.", ["Low desire", "Performance concerns", "Pain"]),
  t("Premature Ejaculation", "General Medicine", "Confidential evaluation with medical and behavioural treatment options.", ["Early ejaculation", "Anxiety", "Relationship stress"]),
  t("ECG", "General Medicine", "Quick heart rhythm recording, read by the doctor on the same visit.", ["Chest discomfort", "Palpitations", "Routine checkup"]),
  t("Headache and Vertigo Care", "Headache and Vertigo", "Diagnosis of migraine, tension headache and balance problems.", ["Migraine", "Spinning sensation", "Nausea"]),
  t("Seizure", "Neurotology", "Evaluation after a seizure, medication review and safety advice. In an emergency, call immediately.", ["Fits", "Fainting", "Confusion"]),
  t("ENT Treatment", "Neurotology", "Care for ear, nose and throat problems.", ["Ear pain", "Sinus", "Tonsils"]),
  t("Knee Pain Treatment", "Orthopedics", "Assessment of knee pain with X-Ray, medication and physiotherapy plans.", ["Knee pain", "Swelling", "Stiffness"]),
  t("Orthopaedic / Arthroscopy", "Orthopedics", "Consultation for bone, joint and sports injuries, with referral for arthroscopy when needed.", ["Joint injury", "Ligament tear", "Back pain"]),
  t("Physiotherapy for ACL and Meniscus Tear", "Physiotherapy", "Structured rehab programmes to rebuild strength and movement.", ["ACL tear", "Meniscus injury", "Post surgery rehab"]),
  t("Dermatology", "Dermatology", "Treatment for skin, hair and nail conditions.", ["Rashes", "Infections", "Pigmentation"]),
  t("Dry Skin", "Dermatology", "Care for dry, itchy and flaky skin with gentle routines.", ["Itching", "Flaking", "Eczema"]),
  t("Hair Loss", "Dermatology", "Finding the cause of hair fall and treating it with medicine and supportive care.", ["Hair fall", "Thinning", "Dandruff"]),
  t("Hairfall, Acne, Allergies, Weight and PCOD", "Dermatology", "Combined care for hormone and lifestyle related skin, hair and weight concerns.", ["Acne", "PCOD", "Weight gain or loss"]),
  t("Cosmetic Treatments", "Cosmetology", "Skin rejuvenation and cosmetic procedures in a clinical setting.", ["Dull skin", "Scars", "Pigmentation"]),
  t("Platelet Rich Plasma (PRP)", "Aesthetic Medicine", "PRP therapy for hair restoration and skin renewal.", ["Hair thinning", "Skin texture", "Acne scars"]),
  t("Child Health Consultation", "Pediatrics", "Care for children's fevers, coughs, growth and vaccination advice.", ["Fever in children", "Cough", "Growth concerns"]),
  t("Palliative Care Support", "Palliative Care", "Comfort-focused care and symptom relief for long-term illness, with family guidance.", ["Pain relief", "Comfort care", "Family support"]),
];

export type LabTest = { slug: string; name: string; sample: string; fasting: boolean; home: boolean; tat: string; about: string };
const lt = (name: string, sample: string, fasting: boolean, home: boolean, tat: string, about: string): LabTest => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name, sample, fasting, home, tat, about,
});

export const LAB_TESTS: LabTest[] = [
  lt("Hemoglobin Test", "Blood", false, true, "Same day", "Checks for anaemia and overall blood health."),
  lt("Prothrombin Time Test", "Blood", false, true, "Same day", "Measures how quickly your blood clots."),
  lt("Creatinine Test", "Blood", false, true, "Same day", "Checks how well your kidneys are working."),
  lt("C-Reactive Protein Test", "Blood", false, true, "Same day", "Detects inflammation or infection in the body."),
  lt("SGPT Test", "Blood", false, true, "Same day", "Liver enzyme test for liver health."),
  lt("SGOT Test", "Blood", false, true, "Same day", "Liver and heart enzyme test."),
  lt("HPV Test", "Swab", false, false, "3 to 5 days", "Screens for human papillomavirus."),
  lt("STD Test", "Blood or swab", false, false, "1 to 3 days", "Confidential screening for sexually transmitted infections."),
  lt("Pathology Panel", "Blood and urine", true, true, "Same day", "General pathology including CBC, sugar and urine tests."),
  lt("ECG", "In clinic", false, false, "Immediate", "Heart rhythm recording, read on the same visit."),
  lt("Digital X-Ray", "In clinic", false, false, "Same day", "High clarity digital imaging for bones and chest."),
  lt("MRI 3T", "Partner centre", false, false, "1 to 2 days", "Advanced 3T MRI imaging arranged through our network."),
];

export const PACKAGES = [
  { name: "Basic Fever Panel", tests: ["CBC", "CRP", "Malaria", "Dengue screening"] },
  { name: "Diabetes Panel", tests: ["Fasting sugar", "Post meal sugar", "HbA1c"] },
  { name: "Liver Function", tests: ["SGPT", "SGOT", "Bilirubin", "Albumin"] },
  { name: "Kidney Function", tests: ["Creatinine", "Urea", "Uric acid", "Electrolytes"] },
  { name: "Full Body Checkup", tests: ["CBC", "Sugar", "Lipid profile", "Liver", "Kidney", "Thyroid"] },
];

export const SYMPTOMS = ["Fever", "Cold", "Headache", "Gastric", "Dry Skin", "Hair Loss", "Ulcer", "Hypertension", "Seizure", "Knee Pain"];

export const FACILITIES = ["Pharmacy, 24 hours", "Diagnostic lab", "Digital X-Ray", "Restroom", "Gender neutral restroom", "Waiting area"];

export const FAQS = [
  { q: "How do I book an appointment at Avica?", a: "Use the Book Appointment page, ask the Avica Assistant, or call either branch. Booking takes under a minute and you receive a token number straight away." },
  { q: "What do the doctors at Avica specialise in?", a: "Dr. Sanjay Kompally is a General Physician (MBBS, Reg. No. 18190) with over 7 years of experience. We also offer care across dermatology, orthopaedics, physiotherapy, pediatrics and more." },
  { q: "What are the clinic timings?", a: "The clinic is open Mon to Sun, 5:30 AM to 1:00 PM and 2:00 PM to 11:55 PM. The pharmacy is open 24 hours." },
  { q: "Where are you located?", a: "Medipally: Shop No 1-105, Medipalli Kaman, opposite Saibaba Temple, Hyderabad 500098. Ghatkesar: Ghatkesar, Hyderabad, Telangana." },
  { q: "What is the consultation fee?", a: "A general physician consultation is Rs 200." },
  { q: "How does the live token work?", a: "Every booking and walk-in gets a token number. Open the Live Token page to see who is being served now, how many people are ahead of you and the estimated wait." },
  { q: "Do you offer home sample collection?", a: "Yes, for most blood tests. Choose home collection when booking a lab test and our team will confirm a time." },
  { q: "Is there a medicine discount?", a: "Yes. Standard medicines get 20 percent off on bills above Rs 400 at our pharmacy." },
];

export const REVIEWS = [
  { text: "Dr. Sanjay at Avica Polyclinic is an excellent and ethical doctor.", who: "Google review, Medipally" },
  { text: "They offer 20% off on standard medicines even for bills above Rs 400.", who: "Google review, Ghatkesar" },
];

export const AVG_CONSULT_MIN = 8;

export function istToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export function slotsForDay(): string[] {
  const out: string[] = [];
  const add = (fromH: number, fromM: number, toH: number, toM: number) => {
    for (let m = fromH * 60 + fromM; m <= toH * 60 + toM; m += 15) {
      out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
    }
  };
  add(6, 0, 12, 45);
  add(14, 0, 23, 30);
  return out;
}

export function fmtTime(hhmm: string) {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`;
}
