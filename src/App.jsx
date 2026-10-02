import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import baseScenarios from './data/scenarios.json'
import baseInsurancePh from './data/insurancePh.json'
import baseTflRules from './data/tflRules.json'
import baseContentData from './data/contentData.json'

import Header from './components/Header'
import LoginGateway from './components/LoginGateway'
import WorkspaceView from './components/WorkspaceView'
import InfoContainer from './components/InfoContainer'
import Footer from './components/Footer'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem('ar_active_user')) || null
  })

  const [currentTab, setCurrentTab] = useState('HOME') 
  const [activeScenarioKey, setActiveScenarioKey] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [scenarios, setScenarios] = useState({})
  const [insurancePh, setInsurancePh] = useState(baseInsurancePh.records || baseInsurancePh) 
  const [tflRules, setTflRules] = useState(baseTflRules.rules || baseTflRules)               
  const [contentData, setContentData] = useState(baseContentData)
  const loadCloudDatabaseScenarios = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('scenarios').select('*')
    
    if (!error && data && data.length > 0) {
      const formattedObject = {}
      data.forEach(item => {
        formattedObject[item.id] = item
      })
      setScenarios(formattedObject)
      
      const targetCategory = currentTab === 'DENIALS' ? 'DENIALS' : 'AR SCENARIO'
      const filteredKeys = Object.keys(formattedObject).filter(k => formattedObject[k].category === targetCategory)
      if (filteredKeys.length > 0) {
        setActiveScenarioKey(filteredKeys[0])
      } else {
        setActiveScenarioKey('')
      }
    } else {
      setScenarios(baseScenarios)
      const targetCategory = currentTab === 'DENIALS' ? 'DENIALS' : 'AR SCENARIO'
      const filteredKeys = Object.keys(baseScenarios).filter(k => baseScenarios[k].category === targetCategory)
      if (filteredKeys.length > 0) {
        setActiveScenarioKey(filteredKeys[0])
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (currentUser && (currentTab === 'AR SCENARIO' || currentTab === 'DENIALS')) {
      loadCloudDatabaseScenarios()
    } else {
      setIsLoading(false)
    }
  }, [currentTab, currentUser])

  useEffect(() => {
    const rootElement = document.documentElement
    if (darkMode) {
      rootElement.setAttribute('data-theme', 'dark')
      rootElement.classList.add('dark')
    } else {
      rootElement.setAttribute('data-theme', 'light')
      rootElement.classList.remove('dark')
    }
  }, [darkMode])
  const handleAddNewScenario = async (newObj) => {
    setIsLoading(true)
    
    const preparedObj = {
      ...newObj,
      onCallAnalysis: Array.isArray(newObj.onCallAnalysis) 
        ? newObj.onCallAnalysis.join('\n') 
        : (newObj.onCallAnalysis || ''),
      importantNotesAndActions: Array.isArray(newObj.importantNotesAndActions)
        ? newObj.importantNotesAndActions.join('\n')
        : (newObj.importantNotesAndActions || '')
    }

    const { error } = await supabase.from('scenarios').insert([preparedObj])
    if (error) {
      alert("Cloud Database Insertion Error: " + error.message)
    } else {
      alert("🚀 Success! New dialogue entry locked into Supabase forever!")
      await loadCloudDatabaseScenarios()
    }
    setIsLoading(false)
  }

  const handleEditScenario = async (idToEdit, updatedObj) => {
    setIsLoading(true)
    
    const preparedObj = {
      ...updatedObj,
      onCallAnalysis: Array.isArray(updatedObj.onCallAnalysis) 
        ? updatedObj.onCallAnalysis.join('\n') 
        : (updatedObj.onCallAnalysis || ''),
      importantNotesAndActions: Array.isArray(updatedObj.importantNotesAndActions)
        ? updatedObj.importantNotesAndActions.join('\n')
        : (updatedObj.importantNotesAndActions || '')
    }

    const { error } = await supabase.from('scenarios').update(preparedObj).eq('id', idToEdit)
    if (error) {
      alert("Cloud Database Modification Fault: " + error.message)
    } else {
      alert("📝 Changes securely pushed to remote PostgreSQL cluster layers!")
      await loadCloudDatabaseScenarios()
    }
    setIsLoading(false)
  }
  const handleDeleteScenario = async (idToDelete) => {
    if (window.confirm("Are you sure you want to permanently delete this dialogue module from the active database pool?")) {
      setIsLoading(true)
      const { error } = await supabase.from('scenarios').delete().eq('id', idToDelete)
      if (error) {
        alert("Database Erasure Fault: " + error.message)
      } else {
        alert("❌ Dialogue trace purged cleanly from Supabase cloud tables.")
        await loadCloudDatabaseScenarios()
      }
      setIsLoading(false)
    }
  }

  const handleAddNewPhone = (newStr) => {
    const updated = [...insurancePh, newStr].sort((a, b) => a.localeCompare(b))
    setInsurancePh(updated)
    localStorage.setItem('ar_insurance_ph', JSON.stringify(updated))
  }

  const handleAddNewTfl = (newObj) => {
    const updated = [...tflRules, newObj].sort((a, b) => a.insurance.localeCompare(b.insurance))
    setTflRules(updated)
    localStorage.setItem('ar_tfl_rules', JSON.stringify(updated))
  }

  const handleUpdateStaticText = (key, title, body) => {
    const updated = { ...contentData, [key]: { title, body } }
    setContentData(updated)
    localStorage.setItem('ar_content_data', JSON.stringify(updated))
  }

  if (!currentUser) {
    return (
      <div className={`min-h-screen flex flex-col justify-center items-center transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <LoginGateway onLoginSuccess={(userObj) => (setCurrentUser(userObj), sessionStorage.setItem('ar_active_user', JSON.stringify(userObj)))} darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center font-mono text-xs bg-zinc-950 text-emerald-400 tracking-widest uppercase">
        ⚡ Initializing full stack database sync pipelines to Supabase engine...
      </div>
    )
  }
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        currentTab={currentTab} 
        setCurrentTab={(tabName) => {
          setCurrentTab(tabName);
          setActiveScenarioKey(''); 
        }} 
        currentUser={currentUser}
        onLogout={() => (setCurrentUser(null), setCurrentTab('HOME'), sessionStorage.removeItem('ar_active_user'))}
      />

      <main className="max-w-6xl w-full mx-auto p-4 md:p-6 flex-grow">
        
        {currentTab === 'HOME' && (
          <div className="py-8 text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to AR Caller Pro Dashboard</h1>
            <p className="max-w-xl mx-auto opacity-80 leading-relaxed text-sm">
              Select one of the learning channels across the header menu navigation above to begin practicing live calling simulations, verifying timely filing thresholds, or searching the payer directory matrix.
            </p>
            <div className="p-6 inline-block rounded-lg border border-gray-400/20 bg-gray-500/5 text-left text-xs space-y-1">
              <p className="font-bold">Logged in Profile Status:</p>
              <p>User Identity Name: <span className="underline font-semibold">{currentUser.username}</span></p>
              <p>System Security Role Privilege Level: <span className="uppercase tracking-wider font-bold text-emerald-500">{currentUser.role}</span></p>
            </div>
          </div>
        )}

        {(currentTab === 'AR ▾' || currentTab === 'RCM STEPS') && (
          <InfoContainer 
            tabKey={currentTab === 'AR ▾' ? 'what_is_ar' : 'rcm_steps'}
            data={contentData}
            currentUser={currentUser}
            onUpdateText={handleUpdateStaticText}
            darkMode={darkMode}
          />
        )}

        {(currentTab === 'AR SCENARIO' || currentTab === 'DENIALS') && (
          <WorkspaceView 
            currentTab={currentTab}
            scenarios={scenarios}
            activeScenarioKey={activeScenarioKey}
            setActiveScenarioKey={setActiveScenarioKey}
            currentUser={currentUser}
            onAddScenario={handleAddNewScenario}
            onDeleteScenario={handleDeleteScenario}
            onEditScenario={handleEditScenario}
            darkMode={darkMode}
          />
        )}

        {currentTab === 'INS PH#' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-400/20 pb-4">
              <div>
                <h1 className="text-xl font-bold uppercase tracking-tight">Insurance contact number to check claim status</h1>
                <p className="text-xs text-blue-500 font-semibold mt-1">🔵 For the contact number of Medicare Insurance click here</p>
                <p className="text-xs text-red-500 font-bold mt-0.5">🔴 If you want to add any insurance contact number to the below list, please click add button.</p>
              </div>
              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => {
                    const company = prompt("Enter Insurance Company Name:")
                    const numbers = prompt("Enter Contact Phone Number(s):")
                    if (company && numbers) {
                      handleAddNewPhone(`${company.toUpperCase()} : ${numbers}`)
                    }
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider"
                >
                  ➕ Add New Ins Phone Number
                </button>
              )}
            </div>
            
            {currentUser.role === 'admin' && (
              <button 
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ records: insurancePh }, null, 2))
                  const downloadAnchor = document.createElement('a')
                  downloadAnchor.setAttribute("href", dataStr)
                  downloadAnchor.setAttribute("download", "insurancePh.json")
                  downloadAnchor.click()
                }}
                className="mb-4 text-xs font-semibold px-3 py-1 bg-zinc-500/20 rounded border border-zinc-400 hover:bg-zinc-500/40 transition-all text-current"
              >
                💾 Download Updated insurancePh.json File
              </button>
            )}

            <div className="p-4 border border-gray-400/30 rounded bg-gray-500/5 font-mono text-sm leading-loose whitespace-pre-wrap space-y-1">
              {insurancePh.map((record, index) => (
                <div key={index} className="border-b border-gray-400/10 last:border-0 pb-1 pt-1">{record}</div>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'TFL' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-400/20 pb-4">
              <div>
                <h1 className="text-xl font-bold uppercase tracking-tight">Timely Filing Limit (TFL) Sheet</h1>
                <p className="text-xs text-red-500 font-bold mt-1">🔴 If you want to add TFL for any insurance to the below list, please click add button.</p>
              </div>
              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => {
                    const insName = prompt("Enter Insurance Plan Name:")
                    const tflLimit = prompt("Enter Timely Filing Limit Window (e.g., 90 days):")
                    if (insName && tflLimit) {
                      handleAddNewTfl({ insurance: insName, limit: tflLimit })
                    }
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow transition-all uppercase tracking-wider"
                >
                  ➕ Add New TFL Rule
                </button>
              )}
            </div>

            {currentUser.role === 'admin' && (
              <button 
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ rules: tflRules }, null, 2))
                  const downloadAnchor = document.createElement('a')
                  downloadAnchor.setAttribute("href", dataStr)
                  downloadAnchor.setAttribute("download", "tflRules.json")
                  downloadAnchor.click()
                }}
                className="mb-4 text-xs font-semibold px-3 py-1 bg-zinc-500/20 rounded border border-zinc-400 hover:bg-zinc-500/40 transition-all text-current"
              >
                💾 Download Updated tflRules.json File
              </button>
            )}

            <div className="overflow-x-auto border border-gray-400/30 rounded">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className={`border-b border-gray-400/30 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black'} font-bold uppercase text-xs tracking-wider`}>
                    <th className="p-3">Insurance Name</th>
                    <th className="p-3 w-1/3">TFL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-400/20">
                  {tflRules.map((rule, idx) => (
                    <tr key={idx} className="hover:bg-gray-500/5 transition-colors">
                      <td className="p-3 font-semibold">{rule.insurance}</td>
                      <td className="p-3 font-mono">{rule.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <Footer />

    </div>
  )
}
