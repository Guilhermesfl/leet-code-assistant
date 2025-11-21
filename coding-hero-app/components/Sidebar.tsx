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
    <aside className={`bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 w-64 ${mobileOpen ? 'block' : 'hidden'} md:flex md:flex-col h-screen overflow-hidden`}>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Logo/Brand */}
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center justify-center gap-2 mb-2 p-2 rounded-lg hover:bg-gray-700 transition-colors group">
            <span className="text-2xl group-hover:text-orange-400 transition-colors">🔥</span>
          </Link>
          <Link href="/dashboard" className="block">
            <h3 className="text-lg font-bold text-white hover:text-orange-400 transition-colors text-center">LearnForge</h3>
          </Link>
        </div>

        {/* Dashboard Link */}
        <div className="px-4 pb-4">
          <Link href="/dashboard" className="flex items-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg px-3 py-2 transition-colors group">
            <svg className="w-5 h-5 group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">Dashboard</span>
          </Link>
        </div>
        
        {/* Your Forge Section */}
        <div className="px-4 pb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Your Forge</h4>
          <div className="space-y-1">
            <Link href="/study-plan" className="flex items-center gap-3 text-gray-300 hover:bg-green-900/30 hover:text-white rounded-lg px-3 py-2 transition-colors group">
              <svg className="w-5 h-5 text-green-500 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Study Plan</span>
            </Link>
            <Link href="/progress" className="flex items-center gap-3 text-gray-300 hover:bg-blue-900/30 hover:text-white rounded-lg px-3 py-2 transition-colors group">
              <svg className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium">Progress</span>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Content</h4>
          
          {/* Search */}
          <div className="mb-4 hidden md:block">
            <Search />
          </div>
          
          {/* Collapsible Categories */}
          <div className="space-y-2">
            {Object.keys(byCategory).sort().map(category => {
              const isExpanded = expandedCategories.has(category)
              const categorySlug = getCategorySlug(category)
              const categoryIcon = getCategoryIcon(category)
              
              return (
                <div key={category}>
                  <div className="flex items-center justify-between group">
                    <Link 
                      href={`/categories/${categorySlug}`}
                      className="text-sm font-semibold text-gray-300 hover:text-orange-400 transition-colors flex-1 py-2 px-3 flex items-center gap-2 rounded-lg hover:bg-gray-700/50"
                    >
                      <span className="text-base">{categoryIcon}</span>
                      <span>{category}</span>
                    </Link>
                    <button
                      onClick={() => toggleCategory(category)}
                      className="p-2 hover:bg-gray-700 rounded transition-colors mr-2"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="mt-1 ml-2 border-l-2 border-gray-700 pl-3 space-y-1">
                      {byCategory[category].map((item: any) => (
                        <div key={item.slug}>
                          <Link href={`/categories/${categorySlug}/${item.slug}`} className="text-sm text-gray-400 hover:text-orange-400 hover:underline block py-1">{item.title}</Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Fixed Profile Section at Bottom */}
      <div className="p-4 border-t border-gray-700 bg-gray-900/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg opacity-60 cursor-not-allowed">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-semibold">
            U
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300">User Profile</p>
            <p className="text-xs text-gray-500">Coming Soon</p>
          </div>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar