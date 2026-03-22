# Nedim Zec — Portfolio

Personal developer portfolio built with **Next.js 14** (App Router), **React**, **TypeScript**, **Tailwind CSS**, and a **Three.js** hero scene. It presents featured projects, skills, experience, and a working contact form backed by **Resend**.

#LIVE LINK: https://portofolio-nu-lilac.vercel.app/

## Features

- **Immersive hero** — Full-viewport WebGL particle field and animated geometry with a custom cursor
- **Smooth sections** — About/hero, skills with progress-style presentation, project cards with GitHub (and optional live/video links), experience timeline, contact
- **Contact form** — Server route sends email to your inbox; visitor’s address is set as **Reply-To** so you can answer them directly
- **Responsive layout** — Mobile-friendly navigation and grids
- **Performance-minded** — Static page shell with client components only where needed

## Tech stack

| Area        | Tools                                      |
|------------|---------------------------------------------|
| Framework  | Next.js 14, React 18                        |
| Language   | TypeScript                                  |
| Styling    | Tailwind CSS, CSS variables, custom globals |
| 3D         | Three.js                                    |
| Email API  | Resend                                      |

## Getting started

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Development server       |
| `npm run build` | Production build       |
| `npm run start` | Run production server  |
| `npm run lint`  | ESLint                 |

## Environment variables

Create a `.env` or `.env.local` file in the project root (never commit real secrets).

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_RESEND_API_KEY` | Yes* | Resend API key ([resend.com](https://resend.com)) |
| `NEXT_CONTACT_EMAIL_TO` | Yes* | Email address that receives contact form messages |

\*The contact API falls back to `RESEND_API_KEY` and `CONTACT_TO_EMAIL` if you prefer those names.

Optional:

| Variable | Description |
|----------|-------------|
| `NEXT_CONTACT_FROM_EMAIL` or `CONTACT_FROM_EMAIL` | Verified sender, e.g. `Name <hello@yourdomain.com>`. If omitted, Resend’s test sender is used (subject to Resend account limits). |

Without the required keys, the form still loads but the API returns an error and shows a user-facing message instead of a fake success.

## Deployment

Deploy on **Vercel** (recommended): connect the repository and add the same environment variables in the project settings. Ensure `NEXT_RESEND_API_KEY` and `NEXT_CONTACT_EMAIL_TO` are set for production.

## Project structure (overview)

```
app/
  layout.tsx      # Root layout, fonts, global CSS import
  page.tsx        # Landing page composition
  globals.css     # Design tokens, Tailwind layers, utilities
  api/contact/    # POST handler for the contact form
components/       # Navbar, Hero (Three.js), Skills, Projects, Contact, etc.
```

## License

Private / personal use unless you specify otherwise.

---

**Author:** Nedim Zec
