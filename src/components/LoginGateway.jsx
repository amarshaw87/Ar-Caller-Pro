import React, { useState } from 'react'

export default function LoginGateway({ onLoginSuccess, darkMode, setDarkMode }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
    // STRICT 50/50 GRID FRAMEWORK FOR PERFECT BALANCED EQUAL SPLIT
    <div className={`w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* ================= LEFT SIDE: SECURE SIGN-IN FORM (PERFECTLY CENTERED) ================= */}
      <div className={`w-full h-full flex flex-col justify-center items-center px-8 sm:px-16 lg:px-20 border-r transition-colors shadow-2xl z-10 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <div className="w-full max-w-md space-y-6 py-8">
          
          {/* Logo Framework Bar with Integrated Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md select-none">
                A
              </div>
              <span className="text-lg font-black tracking-tight uppercase">AR Caller Pro</span>
            </div>
            
            <button 
              type="button" 
              onClick={() => setDarkMode(!darkMode)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider transition-all shadow-sm ${darkMode ? 'border-zinc-700 bg-zinc-800 text-amber-400 hover:bg-zinc-700' : 'border-gray-300 bg-gray-100 text-zinc-700 hover:bg-gray-200'}`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          {/* Heading Prompt Segment */}
          <div>
            <h2 className="text-2xl font-black tracking-tight">Sign In</h2>
            <p className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Your AR Caller Pro account and login credentials belong only to you. Sharing accounts may violate HIPAA regulations regarding data privacy.
            </p>
          </div>

          {/* Interactive Login Input Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {errorMessage && (
              <div className="p-3 text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 rounded">
                {errorMessage}
              </div>
            )}

            {/* Input 1: User Identity Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-700 dark:text-zinc-300">User Identity Name / ID:</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., student (or leave blank if using Token)"
                className={`w-full px-3 py-2.5 text-xs border rounded outline-none transition-all font-medium ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-emerald-500' : 'bg-gray-50/50 border-gray-300 text-black focus:border-blue-600'}`}
              />
            </div>

            {/* Input 2: Access Token / Password Box */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-700 dark:text-zinc-300">Access Token / Password:*</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter student or your private Admin token"
                  className={`w-full px-3 py-2.5 text-xs border rounded outline-none transition-all font-mono ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-emerald-500' : 'bg-gray-50/50 border-gray-300 text-black focus:border-blue-600'}`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-50 hover:opacity-100 outline-none select-none"
                >
                  {showPassword ? '🔒' : '👁️'}
                </button>
              </div>
            </div>

            {/* Trigger Button */}
            <div className="pt-2">
              <button 
                type="submit"
                className={`w-full py-3 font-black rounded text-xs transition-colors shadow-md tracking-widest uppercase ${darkMode ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Authenticate Profile Access
              </button>
            </div>

          </form>

          {/* Verification Helper Links */}
          <div className="flex items-center justify-between text-[11px] font-bold border-t border-gray-400/10 pt-4">
            <button type="button" onClick={() => { setUsername('student'); setPassword('student'); }} className="text-blue-600 dark:text-emerald-400 hover:underline">Forgot your user ID?</button>
            <button type="button" onClick={() => { setUsername('student'); setPassword('student'); }} className="text-blue-600 dark:text-emerald-400 hover:underline">Forgot your password?</button>
          </div>

          <div className="pt-2 border-t border-gray-400/10 opacity-60 text-[10px] text-center leading-relaxed">
            Students type <span className="font-semibold underline">student</span> into fields to explore. Administrative data injection access forms require secure token hashing protocols.
          </div>

        </div>
      </div>
      {/* ================= RIGHT SIDE: OPERATIONAL ROI & CORPORATE INFO (PERFECTLY CENTERED) ================= */}
      <div className={`hidden lg:flex h-full flex-col justify-center items-center px-16 xl:px-24 relative overflow-hidden transition-colors ${darkMode ? 'bg-zinc-950' : 'bg-gradient-to-br from-slate-50 via-slate-100 to-zinc-200'}`}>
        
        {/* Abstract graphic ambient meshes for high-end web layout look */}
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30 ${darkMode ? 'bg-emerald-500/5' : 'bg-emerald-500/10'}`}></div>
        <div className={`absolute -bottom-40 left-10 w-96 h-96 rounded-full blur-3xl opacity-30 ${darkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'}`}></div>

        <div className="w-full max-w-md space-y-8 relative z-10 py-8">
          
          <div className="space-y-3">
            <h3 className="text-2xl font-black tracking-tight">New to AR Caller Pro?</h3>
            <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed">
              Discover a high-performance web workspace designed to transform US Healthcare Revenue Cycle Management operational business rules into interactive visual learning models.
            </p>
          </div>

          {/* Capability Matrix Parameters Grid - High-Octane Corporate RCM Terminology */}
          <ul className="space-y-5 text-xs font-semibold text-gray-700 dark:text-zinc-300">
            
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✔</span>
              <div className="leading-relaxed">
                <strong className="text-gray-900 dark:text-white block text-sm font-bold mb-0.5 text-emerald-500">🚀 Mitigate Phone Anxiety with Absolute Confidence</strong>
                Never second-guess an insurance representative again. Our real-time interactive navigation vectors empower fresh analysts to counter tough payer objections instantly.
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✔</span>
              <div className="leading-relaxed">
                <strong className="text-gray-900 dark:text-white block text-sm font-bold mb-0.5 text-emerald-500">✍️ Automated Performance-Driven Account Notes</strong>
                Eliminate the bottleneck of manual documentation. Feed critical parameters into the 20-field matrix to compile structured, audit-ready billing notes instantly.
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✔</span>
              <div className="leading-relaxed">
                <strong className="text-gray-900 dark:text-white block text-sm font-bold mb-0.5 text-emerald-500">🎯 Symmetrical Dynamic Logic Tree Matrix</strong>
                Bypass dense, outdated standard operating procedures (SOPs). Access complex CARC/RARC dispute paths through highly scannable visual navigation trees.
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✔</span>
              <div className="leading-relaxed">
                <strong className="text-gray-900 dark:text-white block text-sm font-bold mb-0.5 text-emerald-500">🛡️ High-Velocity Floor Onboarding</strong>
                Compress a standard 4-week training curve down to immediate Day-1 execution. Turn fresh trainees into top-tier production analysts with zero operational friction.
              </div>
            </li>

          </ul>

          {/* Quick-Bypass Action Button for Student Testing Mode */}
          <div className="pt-2">
            <button 
              type="button"
              onClick={() => onLoginSuccess({ username: 'Billing Student Trainee', role: 'user' })}
              className={`px-5 py-2.5 border text-[10px] font-black uppercase tracking-widest rounded transition-all shadow-sm ${darkMode ? 'border-zinc-700 hover:bg-white hover:text-black bg-zinc-900' : 'border-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 bg-transparent'}`}
            >
              Explore Student Mode
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}
