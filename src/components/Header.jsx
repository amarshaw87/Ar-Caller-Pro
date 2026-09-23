import React from 'react'

export default function Header({ darkMode, setDarkMode, currentTab, setCurrentTab, currentUser, onLogout }) {
  // Navigation tabs checklist matching your precise design requirement specs
  const navTabs = ['HOME', 'AR ▾', 'RCM STEPS', 'AR SCENARIO', 'DENIALS', 'INS PH#', 'TFL']

  return (
    <header className={`px-4 md:px-8 py-4 flex flex-col lg:flex-row justify-between items-center border-b border-gray-400/20 transition-colors duration-300 ${darkMode ? 'bg-[#0b3f27] text-white' : 'bg-[#e6e0f8] text-black'}`}>
      
      {/* Brand Logo Wrapper & Theme Controller */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-6">
        <span className="text-xl md:text-2xl font-bold tracking-tight">AR Caller Pro</span>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1.5 text-xs font-bold uppercase rounded shadow border transition-all ${darkMode ? 'bg-white text-black border-white hover:bg-gray-100' : 'bg-black text-white border-black hover:bg-gray-800'}`}
        >
          Toggle Theme Mode
        </button>
      </div>

      {/* Main Tab Channel Row Links */}
      <nav className="mt-4 lg:mt-0 w-full lg:w-auto overflow-x-auto">
        <ul className="flex items-center justify-start lg:justify-end gap-4 md:gap-6 font-bold text-xs md:text-sm tracking-wide whitespace-nowrap">
          {navTabs.map((tab) => (
            <li key={tab}>
              <button 
                onClick={() => setCurrentTab(tab)}
                className={`uppercase hover:opacity-75 transition-opacity pb-1 ${currentTab === tab ? 'underline decoration-2 underline-offset-4 font-black' : ''}`}
              >
                {tab}
              </button>
            </li>
          ))}
          
          {/* Unified Identity Profile Sign-Out Control */}
          <li className="ml-2 border-l border-gray-400/30 pl-4">
            <button 
              onClick={onLogout}
              className="text-xs bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white px-2.5 py-1 rounded transition-all font-semibold"
            >
              LOGOUT
            </button>
          </li>
        </ul>
      </nav>

    </header>
  )
}
