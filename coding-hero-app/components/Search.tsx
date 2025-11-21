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
      <input 
        type="search" 
        placeholder="Search content..." 
        value={query} 
        onChange={e=>setQuery(e.target.value)} 
        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm" 
      />
      {results.length>0 && (
        <div className="absolute bg-gray-800 border border-gray-700 rounded-lg mt-2 w-full z-20 shadow-xl max-h-80 overflow-y-auto">
          {results.map(r => (
            <Link key={r.slug} href={`/docs/${r.slug}`}>
              <a onClick={() => setQuery('')} className="block p-3 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border-b border-gray-700 last:border-b-0">
                <span className="font-medium">{r.title}</span>
                <small className="text-gray-500 ml-2">· {r.category}</small>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
