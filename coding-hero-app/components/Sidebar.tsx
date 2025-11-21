import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Search = dynamic(() => import('./Search'), { ssr: false })

const STORAGE_KEY = 'sidebar-expanded-categories'

const Sidebar: React.FC<{mobileOpen?: boolean}> = ({mobileOpen=false}) => {
  const [open, setOpen] = useState(false)
  const [docs, setDocs] = useState<any[]>([])
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function load() {
      const resp = await fetch('/api/docs')
      const json = await resp.json()
      setDocs(json)
    }
    load()

    // Load expanded state from localStorage
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setExpandedCategories(new Set(JSON.parse(saved)))
    }
  }, [])

  useEffect(() => {
    // Save expanded state to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(expandedCategories)))
  }, [expandedCategories])

  const byCategory = docs.reduce((acc, doc) => {
    (acc[doc.category] = acc[doc.category] || []).push(doc)
    return acc
  }, {} as {[key: string]: any[]})

  const toggleCategory = (category: string) => {
    const next = new Set(expandedCategories)
    next.has(category) ? next.delete(category) : next.add(category)
    setExpandedCategories(next)
  }

  const getCategorySlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-')
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      'Data Structures': '🏗️',
      'Python Docs': '🐍',
      'Algorithm Patterns': '🧩',
      'System Design': '🏛️',
      'Interview Guidelines': '📋'
    }
    return iconMap[category] || '📚'
  }

  return (
    <aside className={`bg-gray-50 border-r p-4 w-64 ${mobileOpen ? 'block' : 'hidden'} md:block overflow-y-auto`}>
      <div className="mb-4">
        <Link href="/dashboard" className="flex items-center justify-center gap-2 mb-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <span className="text-2xl">🏠</span>
        </Link>
        <Link href="/dashboard" className="block">
          <h3 className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors text-center">LearnForge</h3>
        </Link>
      </div>
      
      {/* Main Navigation Links */}
      <div className="mb-4 pb-4 border-b border-gray-300 space-y-2">
        <Link href="/study-plan" className="flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Study Plan
        </Link>
        <Link href="/progress" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Progress
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4 pb-4 border-b border-gray-300 hidden md:block">
        <Search />
      </div>
      
      {/* Collapsible Categories */}
      {Object.keys(byCategory).sort().map(category => {
        const isExpanded = expandedCategories.has(category)
        const categorySlug = getCategorySlug(category)
        const categoryIcon = getCategoryIcon(category)
        
        return (
          <div key={category} className="mb-3">
            <div className="flex items-center justify-between group">
              <Link 
                href={`/categories/${categorySlug}`}
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors flex-1 py-1 flex items-center gap-2"
              >
                <span className="text-base">{categoryIcon}</span>
                <span>{category}</span>
              </Link>
              <button
                onClick={() => toggleCategory(category)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {isExpanded && (
              <div className="mt-1 ml-2 border-l-2 border-gray-200 pl-3 space-y-1">
                {byCategory[category].map((item: any) => (
                  <div key={item.slug}>
                    <Link href={`/categories/${categorySlug}/${item.slug}`} className="text-sm text-gray-600 hover:text-blue-600 hover:underline block py-0.5">{item.title}</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </aside>
  )
}

export default Sidebar