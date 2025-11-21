import Layout from '../components/Layout'
import Link from 'next/link'
import { GetStaticProps } from 'next'

interface CategoryInfo {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  docs: any[]
}

const categories: Record<string, Omit<CategoryInfo, 'docs' | 'slug'>> = {
  'data-structures': {
    title: 'Data Structures',
    description: 'Master fundamental data structures for coding interviews',
    icon: '🏗️',
    color: 'blue'
  },
  'python-docs': {
    title: 'Python Documentation',
    description: 'Essential Python syntax and patterns',
    icon: '🐍',
    color: 'green'
  },
  'algorithm-patterns': {
    title: 'Algorithm Patterns',
    description: 'Common patterns that appear in interviews',
    icon: '🧩',
    color: 'purple'
  },
  'system-design': {
    title: 'System Design',
    description: 'Design scalable, reliable systems',
    icon: '🏛️',
    color: 'orange'
  },
  'interview-guidelines': {
    title: 'Interview Guidelines',
    description: 'Behavioral questions and best practices',
    icon: '📋',
    color: 'red'
  }
}

export default function Dashboard({ categorizedDocs }: { categorizedDocs: CategoryInfo[] }) {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Welcome to LearnForge
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl">
              Your personalized learning hub. Choose your path and start forging your skills.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Quick Actions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Study Plan Card */}
              <Link href="/study-plan">
                <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-green-500 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      📅
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        Study Plan
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Follow your 12-week structured learning path
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600 font-semibold text-sm">
                    <span>Start Learning</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Theory Tracker Card */}
              <Link href="/theory-tracker">
                <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-purple-500 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      📚
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        Theory Tracker
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Track your progress on core concepts
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm">
                    <span>Check Progress</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Problem Tracker Card */}
              <Link href="/problem-tracker">
                <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-blue-500 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      ✅
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        Problem Tracker
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Monitor your coding problem solutions
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                    <span>View Problems</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Learning Resources */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categorizedDocs.map((category) => (
                  <div key={category.slug} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-gray-200">
                    {/* Category Header */}
                    <Link href={`/categories/${category.slug}`}>
                      <div className="bg-gray-50 p-6 cursor-pointer group hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-5xl group-hover:scale-110 transition-transform">{category.icon}</span>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-gray-600 mt-1">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm font-semibold text-gray-700">
                          <span>{category.docs.length} resources available</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Import at build time
  const { getAllDocs } = await import('../lib/docs')
  const allDocs = getAllDocs()

  // Group docs by category
  const categorizedDocs: CategoryInfo[] = Object.entries(categories).map(([slug, info]) => {
    const categoryDocs = allDocs.filter(
      (doc: any) => doc.category.toLowerCase().replace(/\s+/g, '-') === slug
    )
    return {
      slug,
      ...info,
      docs: categoryDocs
    }
  })

  return {
    props: {
      categorizedDocs
    }
  }
}
