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
      
      {/* Main Navigation Links */}
      <div className="mb-4 pb-4 border-b border-gray-300 space-y-2">
        <Link href="/study-plan" className="flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Study Plan
        </Link>
        <Link href="/theory-tracker" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 7h10M7 11h6M7 15h10" />
          </svg>
          Theory Tracker
        </Link>
        <Link href="/problem-tracker" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Problem Tracker
        </Link>
      </div>
      
      {Object.keys(byCategory).map(category => (
        <div key={category} className="mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-2">{category}</div>
          {byCategory[category].map((item: any) => (
            <div key={item.slug} className="mb-1">
              <Link href={`/docs/${item.slug}`} className="text-sm text-gray-600 hover:text-blue-600 hover:underline block py-0.5">{item.title}</Link>
            </div>
          ))}
        </div>
      ))}
    </aside>
  )
}

export default Sidebar