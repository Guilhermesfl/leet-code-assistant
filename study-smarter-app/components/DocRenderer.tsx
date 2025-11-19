import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'

const DocRenderer: React.FC<{content: string}> = ({content}) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeKatex]}>
      {content}
    </ReactMarkdown>
  )
}

export default DocRenderer
