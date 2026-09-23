import React, { useRef, useEffect } from 'react'

export default function Scratchpad({ darkMode, compiledScratchNote, setCompiledScratchNote }) {
  // Use a reference check to keep an invisible fallback backup copy of the compiled note text string
  const historicalBackup = useRef('')

  // Automatically preserve the latest clean template state when the form compiles successfully
  useEffect(() => {
    if (compiledScratchNote.trim() !== '') {
      historicalBackup.current = compiledScratchNote
    }
  }, [compiledScratchNote])

  const handleTextModification = (e) => {
    setCompiledScratchNote(e.target.value)
  }

  const restoreAccidentalDeletion = () => {
    if (historicalBackup.current) {
      setCompiledScratchNote(historicalBackup.current)
    }
  }

  return (
    <section className="mt-6 mb-12 space-y-3">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-xs italic opacity-80 max-w-xl">
          In the below box, final notes will be displayed once you click on Submit button and this box is editable, so you can make the changes as per the requirement
        </p>
        
        {/* Safety button to protect text logs during active call analysis slips */}
        {historicalBackup.current && (
          <button
            type="button"
            onClick={restoreAccidentalDeletion}
            className="text-[11px] font-bold px-3 py-1 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-white transition-all whitespace-nowrap shadow-sm"
          >
            ↩️ Undo / Restore Layout Note
          </button>
        )}
      </div>

      {/* The main built-in scratchpad text canvas element box */}
      <textarea
        value={compiledScratchNote}
        onChange={handleTextModification}
        rows={9}
        placeholder="Your auto-generated billing documentation note will appear here when you hit submit..."
        className={`w-full p-4 border rounded-lg font-mono text-xs md:text-sm leading-relaxed outline-none focus:ring-1 focus:ring-gray-400/30 resize-y shadow-inner transition-all ${
          darkMode 
            ? 'bg-zinc-900 border-zinc-700 text-white focus:border-zinc-500' 
            : 'bg-gray-50 border-gray-300 text-black focus:border-gray-400'
        }`}
      />

      <div className="text-xs font-black text-red-500 text-center uppercase tracking-wider pt-1">
        Note: We are not saving any of your inputs or notes in the backend
      </div>

    </section>
  )
}
