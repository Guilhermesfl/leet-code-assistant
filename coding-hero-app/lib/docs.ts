import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function slugify(filename: string) {
  // strip number prefix (e.g., "01_") and .md
  const name = filename.replace(/^(\d+_)?/, '').replace(/\.md$/, '')
  return name.replace(/_/g, '-').replace(/\s+/g, '-').toLowerCase()
}

function titleFromContent(content: string) {
  const match = content.match(/^#\s+(.*)/m)
  if (match && match[1]) return match[1].trim()
  // fallback to first non-empty line
  const lines = content.split('\n')
  for (let l of lines) {
    if (l.trim()) return l.trim()
  }
  return ''
}

function getRepoRoot() {
  // Next.js runs in coding-hero-app, so repo root is parent
  return path.resolve(process.cwd(), '..')
}

function formatCategoryName(folderName: string): string {
  // Convert folder name to readable category name
  // e.g., "data_structures" -> "Data Structures", "python_docs" -> "Python Docs"
  return folderName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getDocsFolderPaths() {
  const root = getRepoRoot()
  const contentPath = path.join(root, 'content')
  
  // Dynamically discover all folders in content/
  if (!fs.existsSync(contentPath)) {
    return {}
  }
  
  const folders: { [key: string]: string } = {}
  const entries = fs.readdirSync(contentPath, { withFileTypes: true })
  
  entries.forEach(entry => {
    if (entry.isDirectory()) {
      folders[entry.name] = path.join(contentPath, entry.name)
    }
  })
  
  return folders
}

export function getAllDocs() {
  const folders = getDocsFolderPaths()
  const categories = Object.keys(folders)
  const docs: Array<any> = []
  categories.forEach(cat => {
    const fp = (folders as any)[cat]
    if (!fs.existsSync(fp)) return
    const files: string[] = fs.readdirSync(fp).filter((f: string) => f.endsWith('.md'))
    files.forEach((file: string) => {
      const full = path.join(fp, file)
      const raw = fs.readFileSync(full, 'utf-8')
      const {data, content} = matter(raw)
      const title = data.title || titleFromContent(content) || file.replace(/\.md$/, '')
      docs.push({
        title,
        slug: slugify(file),
        category: formatCategoryName(cat),
        filePath: full,
      })
    })
  })
  // sort by slug for a stable order
  return docs.sort((a,b) => a.title.localeCompare(b.title))
}

export function getAllSlugs() {
  return getAllDocs().map(d => d.slug)
}

export function getDocBySlug(slug: string) {
  const docs = getAllDocs()
  const doc = docs.find(d => d.slug === slug)
  if (!doc) return null
  const raw = fs.readFileSync(doc.filePath, 'utf-8')
  
  // Remove the first h1 heading (title) from content since we display it separately
  const contentWithoutTitle = raw.replace(/^#\s+.*\n\n?/, '')
  
  // extract headings (## and ###) for TOC
  const headingRegex = /^#{2,6}\s+(.*)/gm
  const headings: any[] = []
  let match
  while ((match = headingRegex.exec(raw)) !== null) {
    const text = match[1].trim()
    const id = text.toLowerCase().replace(/[\s\W]+/g, '-').replace(/^-|-$/g, '')
    const level = match[0].split(' ')[0].length
    headings.push({ id, text, level })
  }

  return {
    ...doc,
    content: contentWithoutTitle,
    headings,
  }
}
