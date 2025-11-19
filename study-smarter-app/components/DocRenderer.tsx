import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

const DocRenderer: React.FC<{content: string}> = ({content}) => {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeSlug, rehypeHighlight, rehypeKatex]}
    >
      {content}
    </ReactMarkdown>
  )
}

export default DocRenderer
