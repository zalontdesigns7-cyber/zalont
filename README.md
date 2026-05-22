```markdown
# 🌟 Zalont v1.0.0

Zalont is the reimagined version of the Ecocee project — a stylish, modern, and futuristic UI-driven platform crafted for showcasing creative technology, design, and engineering works.

---

## ✨ Overview

> **Zalont** is a cutting-edge landing page and work showcase site, tailored for creative agencies, portfolios, or tech teams. It reflects a strong aesthetic sense, micro animations, and elegant responsiveness — making it a standout visual identity.

---

## 🚀 Tech Stack

| Tech             | Version  |
|------------------|----------|
| **Next.js**      | 14.x     |
| **React**        | 18.x     |
| **Tailwind CSS** | 3.x      |
| **TypeScript**   | Enabled  |
| **Turbo Pack**   | Optional |
| **ESLint + Prettier** | Included |
| **Google Fonts** | [Geist Sans](https://vercel.com/font/next/font/google) & Geist Mono |

---

## 📁 Features in v1.0.0

### 🔖 Landing Page (Home)
- Beautiful animated heading with gradient text
- Tagline and intro about the creative work
- "Get in Touch" button redirects to Instagram
- Fully responsive and optimized layout

### 🎨 Works Page (`/work`)
- Displays all featured works from `constants/works.ts`
- Stylish card-based layout with:
  - Hover zoom-in effects
  - Tags for tech used
  - Title + description
- Internal image support with lazy loading
- Clean animation on entry (Framer Motion support ready)

### 📱 Responsive Design
- Mobile-first with excellent UX
- Smooth layout transition across screen sizes

### 🌐 SEO Friendly
- Includes metadata with title, description

---

## 📂 Project Structure (Important Files)

```

app/
├── layout.tsx             # Root layout
├── page.tsx               # Landing page
├── work/page.tsx          # Work showcase page
├── globals.css            # Tailwind & base styles
constants/
├── works.ts               # All work entries (image, title, tags, description)
public/
├── logo.png               # Logo and media files

````

---

## 🔗 Deployment

- Optimized for [Vercel](https://vercel.com/)
- `next.config.js` can be customized for CDN or asset domains

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/zalont.git
cd zalont

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
````

---

## 📌 Future Plans (v1.1.0 and beyond)

* CMS integration (e.g., Sanity or Contentful)
* Custom domain support
* Blog / insights section
* Client-side animations using Framer Motion
* Light/Dark mode toggle

---

## 🙌 Credits

Built by **ECOCEE**
---