import Layout from '../../components/Layout'
import { getAllDocs, getDocBySlug } from '../../lib/docs'
import DocRenderer from '../../components/DocRenderer'
import TOC from '../../components/TOC'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
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

export default function CategoryOrDocPage({ isCategoryPage, categorySlug, categoryInfo, docs, doc }: any) {
  useEffect(() => {
    window.scrollTo(0, 0)
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.scrollTop = 0
    }
  }, [doc?.slug, categorySlug])

  // Category home page
  if (isCategoryPage) {
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

    const categoryDocs = docs.filter((d: any) => 
      d.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
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
              {categoryDocs.map((d: any) => (
                <Link
                  key={d.slug}
                  href={`/categories/${categorySlug}/${d.slug}`}
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                    {d.title}
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

  // Individual doc page
  if (!doc) return <Layout><div className="p-6">Doc not found</div></Layout>
  
  const docCategorySlug = doc.category.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b p-6 pb-4">
        <div className="mb-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            Home
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link href={`/categories/${docCategorySlug}`} className="text-blue-600 hover:underline text-sm">
            {doc.category}
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-700 text-sm">{doc.title}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {doc.title}
        </h1>
      </div>

      {/* Content section - Article and TOC side by side on large screens */}
      <div className="flex flex-col lg:flex-row lg:gap-8 p-6 pt-4">
        <article className="markdown flex-1">
          <DocRenderer content={doc.content} />
        </article>
        <TOC headings={doc.headings} />
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = getAllDocs()
  
  // Get unique categories
  const categories = Array.from(new Set(docs.map(d => d.category.toLowerCase().replace(/\s+/g, '-'))))
  
  // Category pages (single segment)
  const categoryPaths = categories.map(cat => ({
    params: { slug: [cat] }
  }))
  
  // Doc pages (two segments)
  const docPaths = docs.map(doc => ({
    params: {
      slug: [
        doc.category.toLowerCase().replace(/\s+/g, '-'),
        doc.slug
      ]
    }
  }))
  
  return { paths: [...categoryPaths, ...docPaths], fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slugArray = context.params?.slug as string[]
  
  // Single segment = category page
  if (slugArray.length === 1) {
    const categorySlug = slugArray[0]
    const categoryInfo = categoryDescriptions[categorySlug]
    const docs = getAllDocs()
    
    return {
      props: {
        isCategoryPage: true,
        categorySlug,
        categoryInfo,
        docs
      }
    }
  }
  
  // Two segments = doc page
  if (slugArray.length === 2) {
    const docSlug = slugArray[1]
    const doc = getDocBySlug(docSlug)
    
    return {
      props: {
        isCategoryPage: false,
        doc
      }
    }
  }
  
  return { notFound: true }
}
