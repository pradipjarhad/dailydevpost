<div align="center">
  <br />
  <img src="/public/static/images/logo.png" alt="DailyDevPost Logo" width="120" />
  <h1>🚀 DailyDevPost</h1>
  <p><strong>A High-Performance, SEO-Optimized Developer Blog Built with Next.js & Contentlayer</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success?logo=lighthouse)](https://dailydevpost.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

  <p align="center">
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpradipjarhad%2Fdailydevpost"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
  </p>
</div>

---

## 📖 Introduction

**DailyDevPost** is a modern, production-grade technical blogging platform tailored for developers, software engineers, and tech enthusiasts. Built to handle deep technical content with advanced MDX capabilities, it serves as the ultimate hub for frontend architecture, backend patterns, and system design insights.

DailyDevPost delivers content with blazing speed and top-tier SEO optimizations. It solves the friction of publishing complex technical articles by offering seamless MDX authoring, robust taxonomy (tags/categories), and automated search engine discoverability.

## 🔥 Where to Start

If you want to see the platform in action, check out some of our top-performing frontend engineering deep-dives:

1. **[Edge vs Origin Rendering in Next.js](https://dailydevpost.com/blog/edge-vs-origin-rendering-nextjs-guide)**: A masterclass on optimizing Time-to-First-Byte (TTFB) and CDN caching strategies.
2. **[Zustand vs Jotai Architecture](https://dailydevpost.com/blog/zustand-vs-jotai-state-management)**: Core analysis on managing global state at scale.
3. **[Structuring Turborepo for Scalability](https://dailydevpost.com/blog/turborepo-scalability-guide)**: Transforming scattered monorepos into production-ready architectures.

## ✨ Features

- **⚡ Blazing Fast Performance:** Statically generated and edge-optimized using the latest Next.js App Router capabilities.
- **📝 Advanced MDX Authoring:** Write content in MDX with full support for React components, syntax highlighting (`rehype-prism-plus`), and mathematical equations (`rehype-katex`).
- **🔍 SEO & Discoverability Target:** Entity-first SEO structure, dynamic sitemaps, RSS feeds, and highly optimized structured data/JSON-LD.
- **🎨 Tailwind Typography:** Beautiful, distraction-free reading experience crafted with `@tailwindcss/typography` and dynamic dark/light mode (`next-themes`).
- **💬 Integrated Comments:** Community discussions powered by `giscus` built right into the posts.
- **📊 Content Analytics:** Built-in reading time estimation, author profiles, and robust content categorization via `contentlayer2`.
- **⌨️ Command Palette:** Fast keyboard-accessible navigation leveraging `kbar` (Try `Ctrl+K` or `Cmd+K` on the live site).

## 🛠️ Tech Stack

We utilize a modern, scalable, and type-safe ecosystem:

### Core
- **Framework:** [Next.js 15.4](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS

### Content & Tooling
- **Content Management:** [Contentlayer2](https://contentlayer.dev/)
- **Markdown Processing:** Remark (GFM, Math) & Rehype (Prism Plus, KaTeX, Slug, Citation)
- **Search & Command:** [kbar](https://kbar.vercel.app/)
- **Comments:** [Giscus](https://giscus.app/)
- **Testing:** [Jest](https://jestjs.io/) & React Testing Library

## 📦 Installation

To get DailyDevPost running locally, follow these steps.

### Prerequisites
- Node.js (v18 or higher)
- **pnpm** (Recommended package manager for this repo)

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pradipjarhad/dailydevpost.git
   cd dailydevpost
   ```

2. **Install dependencies:**
   We enforce `pnpm` for deterministic builds.
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file based on `.env.example`.
   ```bash
   cp .env.example .env
   ```
   *Note: Update the environmental values (e.g., Giscus configs, Analytics IDs) as needed for your local setup. Check out `.env.example` to see configurations for Mailchimp, ConvertKit, and Google AdSense.*

4. **Run the Development Server:**
   This command starts the Next.js server alongside the Contentlayer watcher.
   ```bash
   npm run content
   # or
   pnpm run content
   ```

   Visit `http://localhost:3000` to view the application.

## 🚀 Usage

### Creating a New Post

Content is managed in the `content/posts/` directory. Create a new `.mdx` file to start writing:

```mdx
---
title: "Advanced React Patterns in 2026"
date: "2026-04-15"
tags: ["react", "frontend", "architecture"]
draft: false
summary: "An in-depth look at compounding components and server actions."
---

# Your Content Here

You can use standard markdown alongside custom React components.
```

### Building for Production

To create an optimized production build:

```bash
pnpm run build
```

To test the production build locally:
```bash
pnpm run serve
```

## 📂 Project Structure

```text
dailydevpost/
├── app/               # Next.js 15 App Router directory (Pages, Layouts, API routes)
├── components/        # Reusable React components (UI, MDX elements)
├── content/           # Your blog posts and pages (MD/MDX files)
├── css/               # Global CSS and Tailwind directives
├── data/              # Site metadata, authors, and structural config
├── layouts/           # Page layouts used for rendering different MDX content types
├── lib/               # Utility functions, formatting, and SEO helpers
├── public/            # Static assets (Images, Fonts, Favicons)
├── scripts/           # Build-time scripts (RSS generation, post-build tasks)
├── contentlayer.config.ts # Contentlayer schema and MDX configuration
├── next.config.js     # Next.js framework configuration
└── tailwind.config.js # Tailwind CSS theme configuration
```

## ⚙️ Configuration

The core site metadata is configured within `data/siteMetadata.js` (or `ts`). Update this file to alter:
- Site Title & Description
- Author Details
- SEO settings & Social Banners
- Analytics tracking IDs
- Commenting provider configurations (Giscus, Utterances, etc.)

For advanced build configurations, adjust `next.config.js` and `contentlayer.config.ts`.

## 🧪 Testing

We use Jest and React Testing Library to ensure component reliability.

Run the test suite:
```bash
pnpm run test
```

## 🤝 Contributing

We welcome contributions! Whether it's fixing typos, improving architecture, or writing a guest post, your input makes DailyDevPost better.

1. **Fork** the repository
2. **Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'feat: add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request** against the `main` branch.

**Code Guidelines:** We enforce Prettier for code formatting and ESLint for static analysis. Please ensure your code aligns with our linting guidelines by running `pnpm run lint` before committing.

## 🧠 Future Scope / Roadmap

- [ ] **Native View Counter:** Implement upstash/redis based high-performance view counters.
- [ ] **AI Search Integration:** Enhance the `kbar` command palette with semantic embeddings for AI-powered search.
- [ ] **Newsletter Integration:** Built-in form for ConvertKit/Mailchimp subscriber growth.
- [ ] **Web Vitals Dashboard:** Real-time Core Web Vitals monitoring block within the author dashboard.
- [ ] **Multi-language Support (i18n):** Translating top performing content into additional developer markets.

## 🧑‍💻 About the Author

DailyDevPost is built and maintained by **Pradip Jarhad**, a Software Developer specializing in UI/UX and Ethical Design. The platform's goal is to translate daily development struggles into actionable lessons on React, Next.js JavaScript, and high-performance engineering.

Stop building software, start engineering it. 

## 💬 Support & Community

- 🌍 **Read the Blog:** [DailyDevPost.com](https://dailydevpost.com)
- 🐛 **Found a bug?** [Open an issue](https://github.com/pradipjarhad/dailydevpost/issues) on GitHub.
- 💡 **Have a feature request?** Start a discussion in the [GitHub Discussions](https://github.com/pradipjarhad/dailydevpost/discussions) tab.
- 🐦 **Connect with Pradip** on [Twitter/X](https://x.com/dailydevpost) or [LinkedIn](https://www.linkedin.com/in/pradipjarhad).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ and highly optimized for developer experience.* 
