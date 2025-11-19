# Study Smarter - Documentation Reader

Minimalistic documentation reader designed for reading project notes from `python_docs` and `data_structures`.

## Setup

1. Install dependencies

```bash
cd study-smarter-app
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
- You can run `npm run dev` inside `study-smarter-app` to start locally. The app reads the markdown directly from your repository root.
