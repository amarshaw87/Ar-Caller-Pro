import React, { useState, useEffect } from 'react'

export default function InfoContainer({ tabKey, data, currentUser, onUpdateText, darkMode }) {
  const pageData = data[tabKey] || { title: 'Information Page', body: 'No data content available.' }
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(pageData.title)
  const [editBody, setEditBody] = useState(pageData.body)

  // Sync state modifications smoothly when moving between AR and RCM tabs
  useEffect(() => {
    setEditTitle(pageData.title)
    setEditBody(pageData.body)
    setIsEditing(false)
  }, [tabKey, data])

  const handleFormSave = (e) => {
    e.preventDefault()
    onUpdateText(tabKey, editTitle, editBody)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      
      {/* Upper header section tracking separate edit action controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-400/20 pb-4">
        <div className="text-xs font-semibold opacity-70 tracking-wide uppercase">
          HOME &gt; KEY ASSETS &gt; <span className="underline font-bold">{pageData.title}</span>
        </div>
        
        {currentUser.role === 'admin' && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider"
          >
            ✏️ Edit Page Text
          </button>
        )}
      </div>

      {isEditing ? (
        /* Protected Administrative Editor Entry Layout Window */
        <form onSubmit={handleFormSave} className="p-6 border border-gray-400/30 rounded bg-gray-500/5 space-y-4 max-w-3xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-500">🛡️ Admin Access: Edit Knowledge Content Frame</h3>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider">Page Main Header Title:</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              className={`p-2 border rounded text-sm outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider">Page Content Workspace:</label>
            <textarea
              rows={8}
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
              className={`p-3 border rounded text-sm outline-none font-mono ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded shadow uppercase tracking-wide">
              🟢 Update Live Page
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded shadow uppercase tracking-wide">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* Public Read-Only Layout Presentation Frame for Students */
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight border-b border-gray-400/10 pb-2">{pageData.title}</h1>
          <p className="whitespace-pre-wrap leading-relaxed text-sm opacity-90 text-justify">{pageData.body}</p>
        </div>
      )}

    </div>
  )
}
