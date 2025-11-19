import React from 'react'

const TOC: React.FC<{headings: any[]}> = ({headings}) => {
  if (!headings || headings.length === 0) return null
  return (
    <nav className="p-4 border-l ml-4 hidden lg:block sticky self-start overflow-y-auto" style={{width: '18rem', maxHeight: 'calc(100vh - 10rem)', top: '9rem'}}>
      <div className="text-sm font-semibold mb-3">On this page</div>
      <ul className="space-y-2">
        {headings.map((h, i) => (
          <li key={i} style={{marginLeft: `${(h.level - 2) * 12}px`}}>
            <a href={`#${h.id}`} className="text-gray-600 hover:underline text-sm">{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TOC
