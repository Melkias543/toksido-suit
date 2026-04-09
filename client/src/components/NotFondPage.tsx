import { PackageOpen } from 'lucide-react';
import React from 'react'
type props= {
    title:String
    desc:String
}
function NotFondPage({title,desc}:props) {
  return (
    <>
      {" "}
      <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 text-center m-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-full shadow-xl border border-gray-100 dark:border-gray-700">
            <PackageOpen
              size={48}
              strokeWidth={1.5}
              className="text-gray-400 dark:text-gray-500"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
{title}        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-[280px] leading-relaxed">
        {desc}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-2 text-sm font-bold cursor-pointer uppercase tracking-widest bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg"
        >
          Refresh Page
        </button>
      </div>
    </>
  );
}

export default NotFondPage