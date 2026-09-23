import React from 'react'

export default function Footer() {
  // Master array of required legal tracking links from your layout spec
  const footerLinks = ['HOME', 'CONTACT US', 'ABOUT US', 'PRIVACY POLICY', 'DISCLAIMER']

  return (
    <footer className="w-full mt-auto border-t border-gray-400/20 px-4 py-8 text-center transition-colors duration-300 bg-[#e6e0f8] dark:bg-[#0b3f27] text-black dark:text-white">
      
      {/* Centered Legal Link Channel Trackers */}
      <nav className="flex flex-wrap justify-center gap-6 mb-4 font-bold text-xs tracking-wider">
        {footerLinks.map((link) => (
          <a 
            key={link} 
            href={`#${link.toLowerCase().replace(' ', '-')}`} 
            className="hover:underline hover:opacity-75 transition-all"
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Your Locked Personal Brand Signature Identity */}
      <div className="text-xs opacity-75 font-semibold tracking-wide">
        Copyright &copy; 2026 AR Caller Pro
      </div>

    </footer>
  )
}
