import React from 'react'
import LocaleSwitcher from './LocaleSwitcher'

function NavBar() {
  return (
    <div>  {/* --- STICKY NAVIGATION --- */}
          <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tighter uppercase">
                Toksido
              </h2>
              <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
                <a href="#" className="hover:text-yellow-500 transition">
                  Collections
                </a>
                <a href="#" className="hover:text-yellow-500 transition">
                  Bespoke
                </a>
                <a href="#" className="hover:text-yellow-500 transition">
                  Showroom
                </a>
              </div>
              <button className="border border-gray-900 dark:border-white px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition">
                Book Fitting
              </button>
              <LocaleSwitcher />
            </div>
          </nav></div>
  )
}

export default NavBar