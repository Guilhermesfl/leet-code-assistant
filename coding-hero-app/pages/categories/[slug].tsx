import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

interface CategoryDescription {
  title: string
  description: string
  purpose: string
  icon: string
}

const categoryDescriptions: Record<string, CategoryDescription> = {
  'data-structures': {
    title: 'Data Structures',
    description: 'Master the fundamental data structures used in coding interviews. Understanding these structures is crucial for solving complex algorithmic problems efficiently.',
    purpose: 'Learn how to choose the right data structure for the problem, implement them from scratch, and understand their time/space complexity trade-offs.',
    icon: '🏗️'
  },
  'python-docs': {
    title: 'Python Documentation',
    description: 'Essential Python syntax, built-in functions, and patterns commonly used in coding interviews. Master the language features that help you write cleaner, faster solutions.',
    purpose: 'Become fluent in Python\'s powerful features like list comprehensions, collections module, and built-in functions to solve problems more efficiently.',
    icon: '🐍'
  },
  'algorithm-patterns': {
    title: 'Algorithm Patterns',
    description: 'Learn the most common algorithmic patterns that appear repeatedly in coding interviews. These patterns are your toolkit for breaking down complex problems.',
    purpose: 'Recognize patterns quickly during interviews, apply the right technique to each problem type, and build intuition for when to use each approach.',
    icon: '🧩'
  },
  'system-design': {
    title: 'System Design',
    description: 'Understand how to design scalable, reliable systems for real-world applications. Essential for senior and staff-level interviews at FAANG companies.',
    purpose: 'Learn to think about trade-offs, scalability, reliability, and make architectural decisions that handle millions of users.',
    icon: '🏛️'
  },
  'interview-guidelines': {
    title: 'Interview Guidelines',
    description: 'Non-technical interview preparation including behavioral questions, time management strategies, communication tips, and general interview best practices.',
    purpose: 'Develop the soft skills and strategies needed to excel in interviews beyond just coding ability.',
    icon: '📋'
  }
}

export default function CategoryPage() {
  const router = useRouter()
  const { slug } = router.query
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const resp = await fetch('/api/docs')
      const json = await resp.json()
      setDocs(json)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </Layout>
    )
  }

  const categoryInfo = categoryDescriptions[slug as string]
  
  if (!categoryInfo) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h1>
            <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
          </div>
        </div>
      </Layout>
    )
  }

  const categoryDocs = docs.filter(doc => 
    doc.category.toLowerCase().replace(/\s+/g, '-') === slug
  )

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            Home
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-700 text-sm">{categoryInfo.title}</span>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{categoryInfo.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.title}</h1>
          </div>
          <p className="text-lg text-gray-700 mb-3">{categoryInfo.description}</p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-900">
              <strong>Why This Matters:</strong> {categoryInfo.purpose}
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Topics ({categoryDocs.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/categories/${slug}/${doc.slug}`}
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  {doc.title}
                </h3>
                <div className="flex items-center text-sm text-blue-600">
                  <span>Read more</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {categoryDocs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No topics available in this category yet.</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
