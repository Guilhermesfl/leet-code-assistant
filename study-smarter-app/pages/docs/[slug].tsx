import Layout from '../../components/Layout'
import { getAllSlugs, getDocBySlug } from '../../lib/docs'
import DocRenderer from '../../components/DocRenderer'
import TOC from '../../components/TOC'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'

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
  return (
    <Layout>
      {/* Header section - Fixed at top, Area name and Topic stacked vertically */}
      <div className="sticky top-0 bg-white z-10 border-b p-6 pb-4">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          {doc.category}
        </p>
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
