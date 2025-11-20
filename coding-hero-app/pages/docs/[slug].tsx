import Layout from '../../components/Layout'
import { getAllSlugs, getDocBySlug } from '../../lib/docs'
import DocRenderer from '../../components/DocRenderer'
import TOC from '../../components/TOC'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import Link from 'next/link'

export default function DocPage({ doc }:{doc:any}){
  useEffect(() => {
    // Scroll to top when document changes
    window.scrollTo(0, 0)
    // Also scroll the main content area to top
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.scrollTop = 0
    }
  }, [doc?.slug])

  if(!doc) return <Layout><div className="p-6">Doc not found</div></Layout>
  
  const categorySlug = doc.category.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b p-6 pb-4">
        <div className="mb-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            Home
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link href={`/categories/${categorySlug}`} className="text-blue-600 hover:underline text-sm">
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
  const slugs = getAllSlugs()
  const paths = slugs.map(slug => ({ params: { slug }}))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string
  const doc = getDocBySlug(slug)
  return { props: { doc } }
}
