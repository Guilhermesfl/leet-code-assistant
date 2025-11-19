import React from 'react'
import Sidebar from './Sidebar'
import Search from './Search'
import { useState } from 'react'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <header className="w-full md:hidden p-4 border-b flex items-center justify-between">
        <div className="font-bold">Study Smarter</div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><Search /></div>
          <button className="p-2" onClick={() => setOpen(v => !v)} aria-label="Open menu">☰</button>
        </div>
      </header>

      <Sidebar mobileOpen={open} />

      <main className="flex-1 overflow-y-auto" style={{scrollPaddingTop: '8rem'}}>
        {children}
      </main>
    </div>
  )
}

export default Layout
