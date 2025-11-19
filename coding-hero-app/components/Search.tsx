import React, {useState, useEffect} from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'

const Search: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [docs, setDocs] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const resp = await fetch('/api/docs')
      const json = await resp.json()
      setDocs(json)
    }
    load()
  }, [])

  useEffect(() => {
    if (!query) { setResults([]); return }
    const fuse = new Fuse(docs, { keys: ['title', 'category'] })
    const r = fuse.search(query).map((x:any) => x.item)
    setResults(r.slice(0, 10))
  }, [query, docs])

  return (
    <div className="relative">
      <input type="search" placeholder="Search docs..." value={query} onChange={e=>setQuery(e.target.value)} className="border rounded px-3 py-1" />
      {results.length>0 && (
        <div className="absolute bg-white border mt-1 w-80 z-20">
          {results.map(r => (
            <Link key={r.slug} href={`/docs/${r.slug}`}>
              <a onClick={() => setQuery('')} className="block p-2 hover:bg-gray-50">{r.title} <small className="text-gray-500">· {r.category}</small></a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
