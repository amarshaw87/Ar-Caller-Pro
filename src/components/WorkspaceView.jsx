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

  // Form Field State Vectors
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
      flowchart_html: flowchartHtml,
      flowchartHtml: flowchartHtml 
    }

    if (editingId) {
      onEditScenario(editingId, payload)
    } else {
      const generatedId = title.toLowerCase().replace(/[^a-z0-9]+/g, '_')
      onAddScenario({ id: generatedId, ...payload })
    }

    // Reset Form Triggers Cleanly
    setShowAddForm(false)
    setEditingId(null)
    setTitle('')
    setFlowchartHtml('')
  }

  // Filter keys matching active dashboard context routing
  const activeCategory = currentTab === 'DENIALS' ? 'DENIALS' : 'AR SCENARIO'
  const scenarioKeysList = Object.keys(scenarios).filter(
    (key) => scenarios[key].category === activeCategory
  )

  return (
    <div className="space-y-6">
      
      {/* ==================== SCENARIO MATRIX HEADER CONTROL ==================== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-400/20 pb-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight">
            ⚡ {currentTab} - Click on Specific Scenario
          </h1>
          <p className="text-xs opacity-80 mt-1">
            🔴 Select any interactive module panel from the grid setup below to initialize caller simulation maps.
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
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider"
          >
            {showAddForm ? '❌ Close Setup Form' : '➕ Add New Scenario'}
          </button>
        )}
      </div>

      {/* ==================== ADMINISTRATIVE CONFIGURATION FORM ==================== */}
      {showAddForm && currentUser.role === 'admin' && (
        <form onSubmit={handleFormSubmit} className="p-4 border border-gray-400/30 rounded bg-gray-500/5 space-y-4 max-w-4xl mx-auto text-sm">
          <h2 className="font-bold text-emerald-500 uppercase tracking-wide">
            🛠️ {editingId ? 'Modify Active Script Parameters' : 'Deploy Unique Scenario Pipeline'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase opacity-80">Scenario Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Claim Denied as Authorization Absent"
                className="p-2 border border-gray-400/30 rounded bg-transparent font-semibold w-full focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase opacity-80">Category Channel</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border border-gray-400/30 rounded bg-zinc-900 text-white font-semibold w-full focus:outline-none"
              >
                <option value="AR SCENARIO">AR SCENARIO</option>
                <option value="DENIALS">DENIALS</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80">Raw HTML Flowchart Content</label>
            <textarea
              value={flowchartHtml}
              onChange={(e) => setFlowchartHtml(e.target.value)}
              placeholder="Paste raw customized layout HTML text script strings here..."
              rows="10"
              className="p-2 border border-gray-400/30 rounded bg-transparent font-mono text-xs w-full focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded"
          >
            🚀 Push Scenario Matrix to Cloud Registry
          </button>
        </form>
      )}
      {/* ==================== HORIZONTAL MODULES CARD GRID LIST ==================== */}
      <div className="p-4 border border-gray-400/20 rounded-xl bg-gray-500/5 shadow-inner">
        <div className="text-[10px] font-black tracking-widest uppercase opacity-60 pb-2 border-b border-gray-400/10 mb-3">
          Completed Interactive Dialogue Modules ({scenarioKeysList.length})
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarioKeysList.length === 0 ? (
            <div className="col-span-full py-6 text-center text-xs opacity-60 font-mono">
              No active scenario directory records found inside this operational group.
            </div>
          ) : (
            scenarioKeysList.map((key) => {
              const item = scenarios[key]
              const isSelected = activeScenarioKey === key

              return (
                <div
                  key={key}
                  onClick={() => setActiveScenarioKey(key)}
                  className={`group flex items-center justify-between p-3 rounded-lg border text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                      : 'border-gray-400/20 bg-gray-400/5 hover:border-gray-400/60 hover:bg-gray-500/10'
                  }`}
                >
                  <span className="truncate pr-2">{item.title}</span>

                  {currentUser.role === 'admin' && (
                    <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenEdit({ id: key, ...item })
                        }}
                        className={`p-1 rounded transition-colors ${isSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-zinc-500/20 text-blue-500'}`}
                        title="Edit Scenario"
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
                        title="Delete Scenario"
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
      </div>

      {/* ==================== INTERACTIVE FLOWCHART VIEWPORT CANVAS ==================== */}
      <div className="mt-8 border border-gray-400/20 rounded-xl bg-gray-500/5 p-4 md:p-6 min-h-[50vh] flex flex-col shadow-sm">
        {activeScenario ? (
          <div className="w-full space-y-4 animate-fadeIn">
            <div className="border-b border-gray-400/10 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base font-black tracking-tight uppercase text-emerald-500">
                📊 On Call Interactive Diagram Matrix: {activeScenario.title}
              </h2>
              <div className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-500/20 border border-zinc-400/30">
                Cluster ID: <span className="font-bold underline">{activeScenarioKey}</span>
              </div>
            </div>

            {/* DYNAMIC RAW HTML COMPILER INJECTION MATRIX */}
            <div
              className="w-full overflow-x-auto rounded-lg bg-transparent"
              dangerouslySetInnerHTML={{
                __html: activeScenario.flowchart_html || activeScenario.flowchartHtml || activeScenario.body || ''
              }}
            />
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center py-16 text-center space-y-3 opacity-60">
            <div className="text-3xl">📊</div>
            <h3 className="text-xs font-bold uppercase tracking-wider">No Scenario Selected</h3>
            <p className="max-w-xs text-xs font-medium leading-relaxed">
              Click on any interactive simulation module row card from the grid panel list above to mount the flowchart maps.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
