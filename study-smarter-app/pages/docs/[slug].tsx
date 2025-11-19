import Layout from '../../components/Layout'
import { getAllSlugs, getDocBySlug } from '../../lib/docs'
import DocRenderer from '../../components/DocRenderer'
import TOC from '../../components/TOC'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function DocPage({ doc }:{doc:any}){
  if(!doc) return <Layout><div className="p-6">Doc not found</div></Layout>
  return (
    <Layout>
      <div className="p-6">
        {/* Header section - Area name and Topic stacked vertically */}
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {doc.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            {doc.title}
          </h1>
        </div>

        {/* Content section - Article and TOC side by side on large screens */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <article className="markdown flex-1">
            <DocRenderer content={doc.content} />
          </article>
          <TOC headings={doc.headings} />
        </div>
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
