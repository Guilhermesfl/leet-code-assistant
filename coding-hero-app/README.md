# Coding Hero - Documentation Reader

Minimalistic documentation reader designed for reading project notes from `python_docs` and `data_structures`.

## Setup

1. Install dependencies

```bash
cd coding-hero-app
npm install
```

1. Run dev server

```bash
npm run dev
```

1. Head to `http://localhost:3000`

## Design

- Next.js + React

- Tailwind CSS for styling

- react-markdown + rehype-highlight + rehype-katex for rendering Markdown

- The app reads Markdown files under the repository root: `python_docs/`, `data_structures/`, and `system_design/`.

## Notes

- This app treats the first H1 as the title and the first paragraph as description.

- Files are automatically sluggified for clean URLs.
- You can run `npm run dev` inside `coding-hero-app` to start locally. The app reads the markdown directly from your repository root.

## Utilities

- Interview Preparation: Visit `/interview-prep` from the sidebar to use a holistic checklist with per-category progress and local persistence.
- Progress Tracker: Visit `/progress` to track completion across the curated 150 LeetCode problems.
