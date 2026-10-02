import React, { useState } from 'react'
import FormMatrix from './FormMatrix'
import Scratchpad from './Scratchpad'

export default function WorkspaceView({ 
  currentTab, 
  scenarios, 
  activeScenarioKey, 
  setActiveScenarioKey, 
  currentUser, 
  onAddScenario, 
  onDeleteScenario, 
  onEditScenario, 
  darkMode 
}) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [newTitle, setNewTitle] = useState('')
  const [newAnalysis, setNewAnalysis] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [compiledScratchNote, setCompiledScratchNote] = useState('')

  const filteredKeys = Object.keys(scenarios || {}).filter(key => scenarios[key]?.category === currentTab)
  
  const hasValidActive = scenarios && scenarios[activeScenarioKey] && scenarios[activeScenarioKey].category === currentTab
  const fallbackKey = filteredKeys && filteredKeys.length > 0 ? filteredKeys[0] : null
  const activeContent = hasValidActive ? scenarios[activeScenarioKey] : (fallbackKey ? scenarios[fallbackKey] : null)

  const cleanDataToArray = (inputData) => {
    if (!inputData) return []
    let rawString = ''
    
    if (Array.isArray(inputData)) {
      rawString = inputData.join('\n')
    } else if (typeof inputData === 'string') {
      rawString = inputData
    } else {
      rawString = JSON.stringify(inputData)
    }

    rawString = rawString
      .replace(/[\[\]"']/g, '')
      .replace(/\\n/g, '\n')
      .replace(/,\s*(?=\n|$)/g, '\n')

    return rawString.split('\n').map(line => line.trim()).filter(line => line !== '')
  }
  const handleCreateScenarioSubmit = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const targetId = isEditing ? editingId : newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    
    const payload = {
      id: targetId,
      title: newTitle,
      category: currentTab,
      onCallAnalysis: newAnalysis,
      flowchartImage: isEditing ? (scenarios[editingId]?.flowchartImage || 'placeholder-tree.png') : 'placeholder-tree.png',
      importantNotesAndActions: newNotes
    }

    if (isEditing) {
      onEditScenario(editingId, payload)
    } else {
      onAddScenario(payload)
    }

    setNewTitle('')
    setNewAnalysis('')
    setNewNotes('')
    setShowAddModal(false)
    setIsEditing(false)
    setEditingId(null)
    setActiveScenarioKey(payload.id)
    setCompiledScratchNote('')
  }

  const pageTitleHeader = currentTab === 'AR SCENARIO' 
    ? 'AR Scenario - Click on Specific Scenario' 
    : 'Denial Codes - Click on Denial Code'

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-400/20 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">{pageTitleHeader}</h1>
          <p className="text-xs font-semibold text-emerald-500 mt-1">🔴 We have added a tool to prepare notes in the below scenarios. Please do share your feedback...</p>
        </div>
        {currentUser?.role === 'admin' && (
          <button 
            onClick={() => {
              setIsEditing(false); setEditingId(null); setNewTitle(''); setNewAnalysis(''); setNewNotes(''); setShowAddModal(true);
            }}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider whitespace-nowrap"
          >
            ➕ Add New Scenario
          </button>
        )}
      </div>

      <div className="p-4 border border-gray-400/20 rounded bg-gray-500/5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">Completed Interactive Dialogue Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredKeys.map((key) => (
            <div
              key={key}
              className={`flex items-center justify-between text-left text-xs font-bold rounded border transition-all overflow-hidden ${activeScenarioKey === key ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-gray-500/10 border-gray-400/30 hover:bg-gray-500/20'}`}
            >
              <button
                type="button"
                onClick={() => { setActiveScenarioKey(key); setCompiledScratchNote(''); }}
                className="p-3 text-left flex-grow truncate outline-none"
              >
                • {scenarios[key]?.title}
              </button>

              {currentUser?.role === 'admin' && (
                <div className="flex items-center pr-2 gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true)
                      setEditingId(key)
                      setNewTitle(scenarios[key]?.title || '')
                      setNewAnalysis(Array.isArray(scenarios[key]?.onCallAnalysis) ? scenarios[key].onCallAnalysis.join('\n') : (scenarios[key]?.onCallAnalysis || ''))
                      setNewNotes(Array.isArray(scenarios[key]?.importantNotesAndActions) ? scenarios[key].importantNotesAndActions.join('\n') : (scenarios[key]?.importantNotesAndActions || ''))
                      setShowAddModal(true)
                    }}
                    className="p-1 text-[10px] bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    ✏️
                  </button>
                  <button type="button" onClick={() => onDeleteScenario(key)} className="p-1 text-[10px] bg-red-600 text-white rounded hover:bg-red-700 transition-colors">❌</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleCreateScenarioSubmit} className={`w-full max-w-2xl p-6 border rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-gray-200 text-black'}`}>
            <h2 className="text-base font-bold uppercase tracking-wider text-emerald-500 pb-2 border-b border-gray-400/20">
              {isEditing ? '✏️ Edit Existing' : '➕ Add New'} {currentTab} Dialogue Module
            </h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase">Scenario Title / Code Name:*</label>
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required placeholder="e.g., Patient Deductible Layout" className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-300'}`} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase">On Call Analysis Guide (Type each step on a new line. Use a single ↓ for arrows, and a ↙ ↘ line where it splits):*</label>
              <textarea rows={10} value={newAnalysis} onChange={(e) => setNewAnalysis(e.target.value)} required placeholder="Claim applied toward Deductible&#10;↓&#10;May I have the processed date?&#10;↓" className={`p-2 border rounded text-xs outline-none font-mono ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-300'}`} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase">Important Notes & Actions (Type each rule on a new line):*</label>
              <textarea rows={6} value={newNotes} onChange={(e) => setNewNotes(e.target.value)} required placeholder="Please take action as per process update..." className={`p-2 border rounded text-xs outline-none font-sans ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-300'}`} />
            </div>

            <div className="flex gap-4 pt-2 justify-end">
              <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded text-xs uppercase tracking-wider">Save & Publish</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-2 bg-zinc-500 text-white font-bold rounded text-xs uppercase tracking-wider">Cancel</button>
            </div>
          </form>
        </div>
      })
  const renderFlowTree = (rawData) => {
    const lines = cleanDataToArray(rawData)
    if (lines.length === 0) return null

    const initialFlow = []
    let hasSplit = false
    const leftBranch = []
    const rightBranch = []
    let currentBranch = null

    lines.forEach((line) => {
      const trimmed = line.trim()
      
      if (trimmed.includes('↙') || trimmed.includes('↘') || trimmed === '↙ ↘' || trimmed === '↙   ↘') {
        hasSplit = true
        return
      }

      if (hasSplit) {
        const upper = trimmed.toUpperCase()
        if (upper.includes('HAS MET') && !upper.includes('NOT MET') && !upper.includes('EXCLUDING')) {
          currentBranch = 'left'
        } else if (upper.includes('ALREADY MET') || upper.includes('EXCLUDING')) {
          currentBranch = 'right'
        } else if (upper.includes('NOT MET')) {
          currentBranch = 'left'
        }

        if (currentBranch === 'left') {
          leftBranch.push(trimmed)
        } else if (currentBranch === 'right') {
          rightBranch.push(trimmed)
        } else {
          if (leftBranch.length <= rightBranch.length) {
            leftBranch.push(trimmed)
          } else {
            rightBranch.push(trimmed)
          }
        }
      } else {
        initialFlow.push(trimmed)
      }
    })

    const renderLineItem = (text, idx) => {
      const isArrow = text === '↓' || text === '│'
      if (isArrow) {
        return <div key={idx} className="text-center text-emerald-500 font-black text-lg my-1 animate-pulse">↓</div>
      }
      return (
        <div key={idx} className={`p-3 rounded-lg border text-center font-semibold text-sm max-w-xl mx-auto shadow-sm tracking-wide leading-relaxed ${
          darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-gray-200 text-gray-800'
        }`}>
          {text}
        </div>
      )
    }

    return (
      <div className="w-full space-y-4 max-w-5xl mx-auto">
        <div className="flex flex-col items-center space-y-2">
          {initialFlow.map((line, idx) => renderLineItem(line, idx))}
        </div>

        {hasSplit && (
          <div className="space-y-2">
            <div className="text-center text-emerald-500 font-black text-xl tracking-widest">↙ &nbsp; &nbsp; ↘</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
              <div className="space-y-2 p-4 rounded-xl border border-gray-400/10 bg-gray-500/5">
                {leftBranch.map((line, idx) => renderLineItem(line, `l-${idx}`))}
              </div>
              <div className="space-y-2 p-4 rounded-xl border border-gray-400/10 bg-gray-500/5">
                {rightBranch.map((line, idx) => renderLineItem(line, `r-${idx}`))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="space-y-6">
      
      {/* HEADER UTILITY CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-400/20 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">{pageTitleHeader}</h1>
          <p className="text-xs font-semibold text-emerald-500 mt-1">🔴 We have added a tool to prepare notes in the below scenarios. Please do share your feedback...</p>
        </div>
        {currentUser?.role === 'admin' && (
          <button 
            onClick={() => {
              setIsEditing(false); setEditingId(null); setNewTitle(''); setNewAnalysis(''); setNewNotes(''); setShowAddModal(true);
            }}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider whitespace-nowrap"
          >
            ➕ Add New Scenario
          </button>
        )}
      </div>

      {/* SEARCH LISTINGS GRID */}
      <div className="p-4 border border-gray-400/20 rounded bg-gray-500/5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">Completed Interactive Dialogue Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredKeys.map((key) => (
            <div
              key={key}
              className={`flex items-center justify-between text-left text-xs font-bold rounded border transition-all overflow-hidden ${activeScenarioKey === key ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-gray-500/10 border-gray-400/30 hover:bg-gray-500/20'}`}
            >
              <button
                type="button"
                onClick={() => { setActiveScenarioKey(key); setCompiledScratchNote(''); }}
                className="p-3 text-left flex-grow truncate outline-none"
              >
                • {scenarios[key]?.title}
              </button>

              {currentUser?.role === 'admin' && (
                <div className="flex items-center pr-2 gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true)
                      setEditingId(key)
                      setNewTitle(scenarios[key]?.title || '')
                      setNewAnalysis(Array.isArray(scenarios[key]?.onCallAnalysis) ? scenarios[key].onCallAnalysis.join('\n') : (scenarios[key]?.onCallAnalysis || ''))
                      setNewNotes(Array.isArray(scenarios[key]?.importantNotesAndActions) ? scenarios[key].importantNotesAndActions.join('\n') : (scenarios[key]?.importantNotesAndActions || ''))
                      setShowAddModal(true)
                    }}
                    className="p-1 text-[10px] bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    ✏️
                  </button>
                  <button type="button" onClick={() => onDeleteScenario(key)} className="p-1 text-[10px] bg-red-600 text-white rounded hover:bg-red-700 transition-colors">❌</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CORE SIMULATOR RUNTIME DASHBOARD LAYOUT CONTROLS VIEW */}
      {activeContent ? (
        <div className="space-y-8 mt-4 border-t border-gray-400/10 pt-6">
          
          {/* FLOW TREE CANVAS HOUSING */}
          <div className="w-full space-y-4">
            <h2 className="text-lg font-black uppercase tracking-wider text-center border-b border-gray-400/10 pb-2">On Call interactive Diagram Matrix</h2>
            <div className="p-6 rounded-xl border border-gray-400/10 bg-gray-500/5 shadow-inner">
              {renderFlowTree(activeContent.onCallAnalysis)}
            </div>
          </div>

          {/* DYNAMIC FLOWCHART ANCHOR */}
          <div className="p-4 border border-dashed border-gray-400/40 rounded bg-gray-500/5 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest opacity-40 mb-1">[ Flowchart Visualization Canvas File Anchor ]</span>
            <img src={`images/${activeContent.flowchartImage}`} alt={activeContent.title} className="max-w-full h-auto rounded border border-gray-400/10" onError={(e) => { e.target.style.display = 'none' }} />
          </div>

          {/* DYNAMIC LIST METRIC WRAPPER FOR IMPORTANT NOTES */}
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider mb-3">Important Notes & Actions:</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed font-medium">
              {cleanDataToArray(activeContent.importantNotesAndActions).map((note, idx) => (
                <li key={idx} className="opacity-90">{note}</li>
              ))}
            </ul>
          </div>

          <FormMatrix darkMode={darkMode} onFormSubmit={(compiledString) => setCompiledScratchNote(compiledString)} onFormReset={() => setCompiledScratchNote('')} />
          <Scratchpad darkMode={darkMode} compiledScratchNote={compiledScratchNote} setCompiledScratchNote={setCompiledScratchNote} />

        </div>
      ) : (
        <p className="text-center py-12 text-sm opacity-50 italic">No scenario modules populated inside this category branch layer yet.</p>
      )}

    </div>
  )
}
