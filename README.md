# MD SHOUROV — Premium 3D Portfolio Website

A futuristic, premium, fully responsive portfolio website for a Digital Marketing & Tracking Specialist.

## 🚀 Tech Stack

- **HTML5** — Semantic, SEO-optimized structure
- **CSS3** — Custom properties, glassmorphism, neon gradients
- **JavaScript (ES Modules)** — Modular, clean architecture
- **Three.js** — 3D particle background with custom shaders
- **GSAP + ScrollTrigger** — Smooth scroll-based animations
- **Vite** — Lightning-fast dev server & optimized builds

## 📁 Project Structure

```
me web/
├── index.html          # Main HTML page
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── css/
│   ├── variables.css   # Design tokens
│   ├── base.css        # Reset & global styles
│   ├── navigation.css  # Navbar
│   ├── hero.css        # Hero section
│   ├── about.css       # About section
│   ├── skills.css      # Skills cards
│   ├── portfolio.css   # Portfolio dashboard
│   ├── services.css    # Services cards
│   ├── agents.css      # AI Agents terminal
│   ├── contact.css     # Contact form
│   └── responsive.css  # All breakpoints
├── js/
│   ├── main.js         # Entry point
│   ├── three-scene.js  # 3D background
│   ├── animations.js   # GSAP animations
│   ├── navigation.js   # Nav behavior
│   ├── agents.js       # AI agent simulation
│   └── contact.js      # Form handling
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed

### Local Development

```bash
# 1. Navigate to project folder
cd "me web"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The site will open at `http://localhost:3000`

### Production Build

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Vercel

1. Push code to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository
4. Framework Preset: **Vite**
5. Click **Deploy**

Or via CLI:
```bash
npx vercel --prod
```

### Netlify

1. Go to [netlify.com](https://netlify.com) → Add new site
2. Import from Git or drag-and-drop `dist/` folder
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy**

Or via CLI:
```bash
npx netlify-cli deploy --prod --dir=dist
```

## ✨ Features

- **3D Particle Background** — Custom WebGL shaders, mouse-reactive
- **7 Premium Sections** — Hero, About, Skills, Portfolio, Services, AI Agents, Contact
- **AI Agent Simulation** — Interactive terminal with tracking tester & auto-fix
- **Analytics Dashboard** — GA4 debug timeline, GTM tags, conversion funnel
- **Glassmorphism Design** — Frosted glass cards throughout
- **Fully Responsive** — Mobile-first, works on all devices
- **SEO Optimized** — Schema.org, Open Graph, semantic HTML
- **Performance Optimized** — Lazy rendering, adaptive 3D quality
- **Accessibility** — ARIA labels, reduced motion support, keyboard nav

## 📝 License

© 2024 MD SHOUROV. All rights reserved.
