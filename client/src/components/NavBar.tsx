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





// import React from "react";
// import LocaleSwitcher from "./LocaleSwitcher";

// function NavBar() {
//   return (
//     <div>
//       {" "}
//       {/* --- STICKY NAVIGATION --- */}
//       {/* Background updated to use Ivory/Bone glassmorphism in light mode and Midnight Navy in dark mode */}
//       <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#f8f5f0]/80 dark:bg-[#0a0f1a]/80 border-b border-[#e2dec9] dark:border-[#c5a059]/20">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
//           {/* Logo in Deep Navy (Light) or Ivory (Dark) */}
//           <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tighter uppercase text-[#1a2b3c] dark:text-[#f8f5f0]">
//             Toksido
//           </h2>

//           {/* Nav Links: Swapped yellow-500 for Champagne Gold (#c5a059) */}
//           <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-[#5a6a7a] dark:text-[#94a3b8]">
//             <a
//               href="#"
//               className="hover:text-[#c5a059] dark:hover:text-[#c5a059] transition-colors duration-300"
//             >
//               Collections
//             </a>
//             <a
//               href="#"
//               className="hover:text-[#c5a059] dark:hover:text-[#c5a059] transition-colors duration-300"
//             >
//               Bespoke
//             </a>
//             <a
//               href="#"
//               className="hover:text-[#c5a059] dark:hover:text-[#c5a059] transition-colors duration-300"
//             >
//               Showroom
//             </a>
//           </div>

//           {/* Action Button: Styled with a Gold border and matching hover state */}
//           <button className="border border-[#1a2b3c] dark:border-[#c5a059]/50 text-[#1a2b3c] dark:text-[#f8f5f0] px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#1a2b3c] hover:text-white dark:hover:bg-[#c5a059] dark:hover:text-[#0a0f1a] transition-all duration-500">
//             Book Fitting
//           </button>

//           <LocaleSwitcher />
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default NavBar;