import Link from 'next/link'
import Layout from '../components/Layout'
import { getAllDocs } from '../lib/docs'
import { GetStaticProps } from 'next'

export default function Home({ categories }: { categories: any[] }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Coding Hero — Docs</h1>
        <p className="mb-6 text-gray-700">A minimalistic documentation reader for your algorithms & data structures notes.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href={`/docs/${cat.firstSlug}`} 
              className="border rounded p-4 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{cat.name}</h2>
              <p className="text-gray-600">{cat.count} document{cat.count !== 1 ? 's' : ''}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = getAllDocs()
  
  // Group by category and get first doc slug for each
  const categoryMap = docs.reduce((acc: any, doc: any) => {
    if (!acc[doc.category]) {
      acc[doc.category] = {
        name: doc.category,
        count: 0,
        firstSlug: doc.slug
      }
    }
    acc[doc.category].count++
    return acc
  }, {})
  
  const categories = Object.values(categoryMap)
  
  return {
    props: {
      categories
    }
  }
}
