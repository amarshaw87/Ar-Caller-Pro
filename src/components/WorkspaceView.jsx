import React, { useState } from 'react'

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
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // Administrative Form State Management Vectors
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(currentTab)
  const [flowchartHtml, setFlowchartHtml] = useState('')

  const activeScenario = scenarios[activeScenarioKey] || null

  const handleOpenEdit = (scenarioItem) => {
    setEditingId(scenarioItem.id)
    setTitle(scenarioItem.title)
    setCategory(scenarioItem.category)
    setFlowchartHtml(scenarioItem.flowchart_html || scenarioItem.flowchartHtml || '')
    setShowAddForm(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = { 
      title, 
      category, 
      flowchart_html: flowchartHtml, // Sync directly with Supabase snake_case parameters
      flowchartHtml: flowchartHtml 
    }

    if (editingId) {
      onEditScenario(editingId, payload)
    } else {
      const generatedId = title.toLowerCase().replace(/[^a-z0-9]+/g, '_')
      onAddScenario({ id: generatedId, ...payload })
    }

    // Reset Form Boundaries Cleanly
    setShowAddForm(false)
    setEditingId(null)
    setTitle('')
    setFlowchartHtml('')
  }

  // Segment Scenario Clusters Mapped To Active Channel Framework
  const activeCategory = currentTab === 'DENIALS' ? 'DENIALS' : 'AR SCENARIO'
  const scenarioKeysList = Object.keys(scenarios).filter(
    (key) => scenarios[key].category === activeCategory
  )

  return (
    <div className="w-full flex flex-col min-h-screen">
      
      {/* ==================== WORKSPACE HEADER MANAGEMENT CONTROL BELT ==================== */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-400/20 pb-4 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">
            ⚡ {currentTab} Interactive Workspace
          </h1>
          <p className="text-xs opacity-70 mt-1">
            Select a specialized calling scenario loop from the left vertical directory panel to load its complete diagram tree blueprint.
          </p>
        </div>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => {
              setEditingId(null)
              setTitle('')
              setFlowchartHtml('')
              setCategory(currentTab)
              setShowAddForm(!showAddForm)
            }}
            type="button"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 uppercase tracking-wider"
          >
            {showAddForm ? '❌ Close Editor Dashboard' : '➕ Add New Scenario Module'}
          </button>
        )}
      </div>

      {/* ==================== ADMIN EDITING SANDBOX CONTROL FORM ==================== */}
      {showAddForm && currentUser.role === 'admin' && (
        <form onSubmit={handleFormSubmit} className="mb-6 p-6 border border-gray-400/30 rounded-xl bg-gray-500/5 space-y-4 max-w-4xl w-full mx-auto">
          <h2 className="text-base font-bold uppercase tracking-wider text-emerald-500">
            🛠️ {editingId ? 'Modify Active Script Vector' : 'Create Brand New Scenario Pipeline'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-80">Scenario Title String</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Claim Denied as TFL Expired"
                className="p-2 border border-gray-400/30 rounded bg-transparent font-semibold text-sm w-full focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-80">Target Tab Category Channel</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border border-gray-400/30 rounded bg-zinc-900 text-white font-semibold text-sm w-full focus:outline-none"
              >
                <option value="AR SCENARIO">AR SCENARIO</option>
                <option value="DENIALS">DENIALS</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-80">Raw Flowchart HTML/Tailwind Code Sandbox Container</label>
            <textarea
              value={flowchartHtml}
              onChange={(e) => setFlowchartHtml(e.target.value)}
              placeholder="Paste your raw customized layout HTML text script strings here..."
              rows="12"
              className="p-3 border border-gray-400/30 rounded bg-transparent font-mono text-xs w-full focus:outline-none focus:border-emerald-500 leading-relaxed"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow transition-all"
          >
            🚀 Securely Save Configuration Matrix to Supabase Cloud
          </button>
        </form>
      )}
      {/* ================================================================= */}
      {/* 🔄 THE TWO-COLUMN MASTER SIDEBAR GRID FRAMEWORK                  */}
      {/* ================================================================= */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* 🗂️ COLUMN 1: LEFT VERTICAL STICKY NAVIGATION DIRECTORY PANEL (1/4 Width) */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-2 p-4 border border-gray-400/20 rounded-xl bg-gray-500/5 max-h-[80vh] overflow-y-auto w-full shadow-inner">
          <div className="text-[10px] font-black tracking-widest uppercase opacity-60 px-2 pb-2 border-b border-b-gray-400/10 mb-1">
            📁 Scenario Directory List ({scenarioKeysList.length})
          </div>
          
          {scenarioKeysList.length === 0 ? (
            <div className="p-4 text-xs opacity-60 font-mono text-center">
              No active cloud modules found inside this channel tier.
            </div>
          ) : (
            scenarioKeysList.map((key) => {
              const item = scenarios[key]
              const isSelected = activeScenarioKey === key

              return (
                <div 
                  key={key} 
                  className={`group flex items-center justify-between p-2.5 rounded-lg border text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10 translate-x-1' 
                      : 'border-gray-400/20 hover:border-gray-400/60 hover:bg-gray-500/10'
                  }`}
                  onClick={() => setActiveScenarioKey(key)}
                >
                  <span className="truncate pr-2">{item.title}</span>
                  
                  {/* Administrative Context Action Modifiers Grid */}
                  {currentUser.role === 'admin' && (
                    <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenEdit({ id: key, ...item })
                        }}
                        className={`p-1 rounded transition-colors ${isSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-zinc-500/20 text-blue-500'}`}
                        title="Edit Module"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteScenario(key)
                        }}
                        className={`p-1 rounded transition-colors ${isSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-zinc-500/20 text-red-500'}`}
                        title="Delete Module"
                      >
                        ❌
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* 📊 COLUMN 2: RIGHT INTERACTIVE DIAGRAM CANVAS VIEWPORT (3/4 Width) */}
        <div className="lg:col-span-3 border border-gray-400/20 rounded-xl bg-gray-500/5 p-4 md:p-6 w-full min-h-[75vh] flex flex-col shadow-sm">
          
          {activeScenario ? (
            <div className="w-full space-y-4 animate-fadeIn">
              {/* Scenario Viewport Meta Header */}
              <div className="border-b border-gray-400/10 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <h2 className="text-lg font-black tracking-tight uppercase text-emerald-500">
                  🎯 Displaying: {activeScenario.title}
                </h2>
                <div className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-500/20 border border-zinc-400/30">
                  Cluster ID: <span className="font-bold underline">{activeScenarioKey}</span>
                </div>
              </div>

              {/* DYNAMIC RAW HTML COMPILER LAYOUT INJECTION CANVAS */}
              <div 
                className="w-full overflow-x-auto rounded-lg bg-transparent"
                dangerouslySetInnerHTML={{ 
                  __html: activeScenario.flowchart_html || activeScenario.flowchartHtml || activeScenario.body || '' 
                }}
              />
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center py-20 text-center space-y-3 opacity-60">
              <div className="text-4xl">📊</div>
              <h3 className="text-sm font-bold uppercase tracking-wider">No Module Active</h3>
              <p className="max-w-xs text-xs font-medium leading-relaxed">
                Click on any verified structural calling simulation route listed inside the left directory index menu to deploy the visual flowchart tracking loops.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
