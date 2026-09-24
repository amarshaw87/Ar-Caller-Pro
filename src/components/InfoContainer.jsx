import React, { useState, useEffect } from 'react'

export default function InfoContainer({ tabKey, data, currentUser, onUpdateText, darkMode }) {
  const pageData = data[tabKey] || { title: 'Information Page', body: 'No data content available.' }
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(pageData.title)
  const [editBody, setEditBody] = useState(pageData.body)

  // Table management states for data records
  const [phoneRecords, setPhoneRecords] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingRecordIndex, setEditingRecordIndex] = useState(null)

  // Mutation form input parameters
  const [inputPayer, setInputPayer] = useState('')
  const [inputNumber, setInputNumber] = useState('')

  // Sync state modifications smoothly when moving between tabs
  useEffect(() => {
    setEditTitle(pageData.title)
    setEditBody(pageData.body)
    setIsEditing(false)
    setShowAddForm(false)
    setEditingRecordIndex(null)

    // Parse data dynamically if viewing either the Insurance List or TFL Sheet tabs
    if ((tabKey === 'INS PH#' || tabKey === 'TFL') && pageData.body) {
      try {
        const records = pageData.body.split('\n').filter(l => l.trim()).map(line => {
          // Look for a colon divider first
          let splitIndex = line.indexOf(':')
          let delimiter = ':'

          // If no colon is found, search for a tab key or triple-space block divider
          if (splitIndex === -1) {
            const spaceMatch = line.match(/\s{2,}/)
            if (spaceMatch) {
              splitIndex = spaceMatch.index
              delimiter = spaceMatch[0]
            }
          }

          if (splitIndex !== -1) {
            return {
              payer: line.substring(0, splitIndex).trim(),
              number: line.substring(splitIndex + delimiter.length).trim()
            }
          }
          return { payer: line.trim(), number: 'N/A' }
        })
        setPhoneRecords(records)
      } catch (err) {
        setPhoneRecords([])
      }
    } else {
      setPhoneRecords([])
    }
  }, [tabKey, data])

    // Serializes table actions back to the raw string format with custom tab dividers
  const saveRecordsToDatabase = (updatedRecords) => {
    // Preserve colon formatting for INS PH#, use clean spacing tabs for TFL columns
    const separator = tabKey === 'INS PH#' ? ' : ' : '\t\t'
    const serializedBody = updatedRecords
      .map(r => `${r.payer}${separator}${r.number}`)
      .join('\n')
    onUpdateText(tabKey, pageData.title, serializedBody)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!inputPayer.trim() || !inputNumber.trim()) return

    const newRecord = { payer: inputPayer.trim(), number: inputNumber.trim() }
    let updated = []

    if (editingRecordIndex !== null) {
      updated = [...phoneRecords]
      updated[editingRecordIndex] = newRecord
    } else {
      updated = [...phoneRecords, newRecord]
    }

    setPhoneRecords(updated)
    saveRecordsToDatabase(updated)

    // Clean up input fields
    setInputPayer('')
    setInputNumber('')
    setShowAddForm(false)
    setEditingRecordIndex(null)
  }

  const handleDeleteRecord = (indexToDelete) => {
    const updated = phoneRecords.filter((_, idx) => idx !== indexToDelete)
    setPhoneRecords(updated)
    saveRecordsToDatabase(updated)
  }

  const handleFormSave = (e) => {
    e.preventDefault()
    onUpdateText(tabKey, editTitle, editBody)
    setIsEditing(false)
  }

  // Active validation check flags for managing interactive tables
  const isInteractiveTable = tabKey === 'INS PH#' || tabKey === 'TFL'

    // Dynamically name table fields depending on active route categories
  const columnLeftName = tabKey === 'INS PH#' ? 'Insurance Company Payer' : 'Insurance Name'
  const columnRightName = tabKey === 'INS PH#' ? 'Primary Directory Phone Number' : 'TFL Threshold Limit'
  const actionButtonText = tabKey === 'INS PH#' ? '➕ Add New Ins Phone Number' : '➕ Add New TFL Rule'
  const formHeaderLabel = tabKey === 'INS PH#' ? 'Insurance Phone Record' : 'Timely Filing Rule'

  return (
    <div className="space-y-6">
      
      {/* Upper header section tracking separate edit action controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-400/20 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">{pageData.title}</h1>
          <p className="text-xs font-semibold text-red-500 mt-1">🔴 If you want to modify any items on the list below, use the administrative action panels.</p>
        </div>
        
        {currentUser?.role === 'admin' && !isEditing && (
          <div className="flex items-center gap-2">
            {isInteractiveTable ? (
              <button
                onClick={() => {
                  setEditingRecordIndex(null)
                  setInputPayer('')
                  setInputNumber('')
                  setShowAddForm(!showAddForm)
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider whitespace-nowrap"
              >
                {showAddForm ? '❌ Close Input Form' : actionButtonText}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider"
              >
                ✏️ Edit Page Text
              </button>
            )}
          </div>
        )}
      </div>

      {/* UNIVERSAL ADMINISTRATIVE FORM MODAL INJECTION PANEL */}
      {isInteractiveTable && showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-4 border border-gray-400/20 rounded bg-gray-500/5 max-w-xl space-y-3">
          <h4 className="text-xs font-black uppercase text-emerald-500 tracking-wider">
            {editingRecordIndex !== null ? `✏️ Edit Existing ${formHeaderLabel}` : `➕ Append New ${formHeaderLabel}`}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Insurance/Carrier Title" 
              value={inputPayer} 
              onChange={e => setInputPayer(e.target.value)} 
              required 
              className={`p-2 text-xs border rounded outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
            <input 
              type="text" 
              placeholder={tabKey === 'INS PH#' ? 'e.g. 800-555-1212' : 'e.g. 180 days / 1 year'} 
              value={inputNumber} 
              onChange={e => setInputNumber(e.target.value)} 
              required 
              className={`p-2 text-xs border rounded outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="submit" className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded text-[10px] uppercase tracking-wide">
              {editingRecordIndex !== null ? 'Update Listing' : 'Publish Row'}
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-1.5 bg-zinc-500 text-white font-bold rounded text-[10px] uppercase tracking-wide">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* INTERACTIVE TABLE GRID CONTAINER FRAME */}
      {isInteractiveTable ? (
        <div className="w-full overflow-x-auto border border-gray-400/20 rounded-lg shadow-sm bg-gray-500/5">
          <table className={`w-full text-left border-collapse text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <thead>
              <tr className={`border-b border-gray-400/20 font-black uppercase tracking-wider ${darkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black'}`}>
                <th className="p-3">{columnLeftName}</th>
                <th className="p-3">{columnRightName}</th>
                {currentUser?.role === 'admin' && <th className="p-3 text-center w-24">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400/10">
              {phoneRecords.length > 0 ? (
                phoneRecords.map((rec, index) => (
                  <tr key={index} className={`transition-colors ${darkMode ? 'hover:bg-zinc-900/40' : 'hover:bg-gray-50/40'}`}>
                    <td className="p-3 font-bold text-emerald-500 tracking-wide">{rec.payer}</td>
                    <td className="p-3 font-mono font-bold tracking-wide">{rec.number}</td>
                    {currentUser?.role === 'admin' && (
                      <td className="p-3 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingRecordIndex(index)
                            setInputPayer(rec.payer)
                            setInputNumber(rec.number)
                            setShowAddForm(true)
                          }}
                          className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-[10px]"
                          title="Edit Row Entry"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRecord(index)}
                          className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-[10px]"
                          title="Delete Row Entry"
                        >
                          ❌
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={currentUser?.role === 'admin' ? 3 : 2} className="p-6 text-center italic opacity-50">
                    No active listings found inside database storage parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : isEditing ? (
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


