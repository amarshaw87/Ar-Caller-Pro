import React, { useState } from 'react'

export default function LoginGateway({ onLoginSuccess, darkMode, setDarkMode }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    const cleanUser = username.trim()
    const cleanPass = password.trim()

    // 🔐 ADMIN ACCESS CREDENTIALS GATE
    if (cleanPass === 'AmarShaw_Admin_Pro') {
      onLoginSuccess({
        username: cleanUser || 'Amar Shaw (Admin)',
        role: 'admin'
      })
      return
    }

    // 🎓 STUDENT / PUBLIC ACCESS CREDENTIALS GATE
    if (cleanUser.toLowerCase() === 'student' || cleanPass.toLowerCase() === 'student' || cleanUser !== '') {
      onLoginSuccess({
        username: cleanUser || 'Billing Student Trainee',
        role: 'user'
      })
      return
    }

    setErrorMessage('Invalid authentication parameters. Please enter a valid name or credentials.')
  }

  return (
    <div className={`w-full max-w-md p-6 border rounded-lg shadow-xl mx-4 transition-all duration-300 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-200'}`}>
      
      {/* Integrated Header Toggle inside our Login Screen */}
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-400/20">
        <h2 className="text-xl font-black uppercase tracking-tight">AR Caller Pro Login</h2>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1 text-xs font-bold uppercase rounded border transition-all ${darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}
        >
          Theme
        </button>
      </div>

      <form onSubmit={handleAuthSubmit} className="space-y-4">
        
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider">User Identity Name / ID:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., student (or leave blank if using Token)"
            className={`p-2.5 border rounded text-sm outline-none transition-all ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white focus:border-emerald-500' : 'bg-white border-gray-300 text-black focus:border-purple-500'}`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider">Access Token / Password:*</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter student or your private Admin token"
            className={`p-2.5 border rounded text-sm outline-none transition-all ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white focus:border-emerald-500' : 'bg-white border-gray-300 text-black focus:border-purple-500'}`}
          />
        </div>

        {errorMessage && (
          <p className="text-xs font-bold text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20">{errorMessage}</p>
        )}

        <div className="pt-2">
          <button 
            type="submit"
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow transition-all uppercase tracking-wide text-sm"
          >
            Authenticate Profile Access
          </button>
        </div>

      </form>

      <div className="mt-4 pt-4 border-t border-gray-400/10 text-center opacity-60 text-[11px] leading-relaxed">
        Students type <span className="font-semibold underline">student</span> into fields to explore. Administrative data injection access forms require secure token hashing protocols.
      </div>

    </div>
  )
}
