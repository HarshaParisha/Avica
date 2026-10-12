# Avica

**Avica Polyclinic & Diagnostics** — Modern web application for Avica Clinic (Medipally & Ghatkesar, Hyderabad).

Features:
- **Instant Doctor Appointments**: Book Dr. Sanjay Kompally (MBBS, General Physician) online.
- **Live Queue & Token Tracker**: View live token status in real-time.
- **Diagnostic Lab & Tests**: Search and book health packages and diagnostics.
- **24/7 Pharmacy & Clinic Support**: Direct WhatsApp and phone connections.
- **Interactive AI/FAQ Assistant**: Accessible medical clinic assistant dialog.
- **Full Responsive Design**: Optimized for mobile, tablet, and desktop viewports.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data & State**: [TanStack Query](https://tanstack.com/query) + [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/), Sonner Toasts

---

## Getting Started Locally

### Prerequisites

- Node.js (v18+) or Bun

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` (already pre-configured for demo):
```bash
cp .env.example .env
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

The production-ready output will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## Deployment Ready

This project is configured as a client-side Single Page Application (SPA). For zero-config deployment:
- **Vercel**: Deploy the repo directly, build command `npm run build`, output directory `dist`.
- **Netlify**: Deploy the repo directly, publish directory `dist`.
- **Cloudflare Pages**: Framework preset `Vite`, output directory `dist`.
