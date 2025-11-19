import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Search = dynamic(() => import('./Search'), { ssr: false })

const Sidebar: React.FC<{mobileOpen?: boolean}> = ({mobileOpen=false}) => {
  const [open, setOpen] = useState(false)
  const [docs, setDocs] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const resp = await fetch('/api/docs')
      const json = await resp.json()
      setDocs(json)
    }
    load()
  }, [])

  const byCategory = docs.reduce((acc, doc) => {
    (acc[doc.category] = acc[doc.category] || []).push(doc)
    return acc
  }, {} as {[key: string]: any[]})

  return (
    <aside className={`bg-gray-50 border-r p-4 w-64 ${mobileOpen ? 'block' : 'hidden'} md:block overflow-y-auto`}>
      <Link href="/" className="block mb-4">
        <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">Coding Hero</h3>
      </Link>
      <div className="mb-4 hidden md:block">
        <div className="mb-2">
          {/* Search component for wide screens */}
          <div>
              <Search />
          </div>
        </div>
      </div>
      {Object.keys(byCategory).map(category => (
        <div key={category} className="mb-4">
          <div className="text-xs uppercase text-gray-400 mb-2">{category}</div>
          {byCategory[category].map(item => (
            <div key={item.slug} className="mb-1">
              <Link href={`/docs/${item.slug}`} className="text-gray-700 hover:underline">{item.title}</Link>
            </div>
          ))}
        </div>
      ))}
    </aside>
  )
}

export default Sidebar