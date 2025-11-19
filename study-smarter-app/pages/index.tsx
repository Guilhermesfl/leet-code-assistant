import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Study Smarter — Docs</h1>
        <p className="mb-6 text-gray-700">A minimalistic documentation reader for your algorithms & data structures notes.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/docs/arrays-and-strings" className="border rounded p-4 hover:shadow-md">
            <h2 className="text-xl font-semibold">Python Docs</h2>
            <p className="text-gray-600">List operations, collections, common patterns and tips.</p>
          </Link>
          <Link href="/docs/arrays-and-strings" className="border rounded p-4 hover:shadow-md">
            <h2 className="text-xl font-semibold">Data Structures</h2>
            <p className="text-gray-600">Arrays, Linked Lists, Trees, Graphs and more.</p>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
