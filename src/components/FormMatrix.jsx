import React, { useState } from 'react'

export default function FormMatrix({ darkMode, onFormSubmit, onFormReset }) {
  // Initialize state tracker fields to perfectly match the 20 required parameters
  const [fields, setFields] = useState({
    sourceStatus: '', clearinghouseComments: '', insuranceName: '', insurancePhone: '',
    repName: '', websiteName: '', coverageAvailable: 'Yes', policyEffectiveDate: '',
    policyActive: 'Yes', policyTermedDate: '', policyActiveDos: 'Yes', tflValue: '',
    claimMailingAddress: '', faxProvided: 'Yes', faxNumber: '', payerIdProvided: 'Yes',
    payerId: '', additionalComments: '', callReference: '', actionStatus: ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFields(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Auto-generate standard industry notes narrative block format matching instructions
    const generatedSummary = `=== AR CALLER PRO SYSTEM NOTES ===
DATE OF CALLED SUMMARY: ${new Date().toLocaleDateString()}
INSURANCE: ${fields.insuranceName} (PH#: ${fields.insurancePhone}) | WEBSITE: ${fields.websiteName}
REP NAME: ${fields.repName} | CALL REFERENCE NUMBER: ${fields.callReference}
SOURCE OF STATUS: ${fields.sourceStatus}
----------------------------------------------------------------------
ELIGIBILITY STATUS TRACKING MATRIX:
- Coverage Details Available: ${fields.coverageAvailable}
- Policy Validation Timeline: Effective From: ${fields.policyEffectiveDate} ${fields.policyTermedDate ? \`Until: \${fields.policyTermedDate}\` : '(No Termed Date)'}
- Policy Active status on Date of Service (DOS): ${fields.policyActiveDos}
----------------------------------------------------------------------
CLAIM AUDIT & PROCESSING INSTRUCTIONS:
- System Payer ID: ${fields.payerId} (Validated via Rep: ${fields.payerIdProvided})
- Timely Filing Window (TFL): ${fields.tflValue}
- Designated Submission Mailing Address: ${fields.claimMailingAddress}
- Verification Fax Channel Destination: ${fields.faxNumber || 'N/A'} (Provided: ${fields.faxProvided})
\${fields.clearinghouseComments ? \`- Clearinghouse Log Context: \${fields.clearinghouseComments}\\n\` : ''}\underline{\${fields.additionalComments ? \`- Additional On-Call Context: \${fields.additionalComments}\\n\` : ''}}----------------------------------------------------------------------
FINAL ASSIGNED SYSTEM ACTION CODE: [\${fields.actionStatus.toUpperCase()}]
======================================================================\`

    onFormSubmit(generatedSummary)
  }
  const handleReset = () => {
    setFields({
      sourceStatus: '', clearinghouseComments: '', insuranceName: '', insurancePhone: '',
      repName: '', websiteName: '', coverageAvailable: 'Yes', policyEffectiveDate: '',
      policyActive: 'Yes', policyTermedDate: '', policyActiveDos: 'Yes', tflValue: '',
      claimMailingAddress: '', faxProvided: 'Yes', faxNumber: '', payerIdProvided: 'Yes',
      payerId: '', additionalComments: '', callReference: '', actionStatus: ''
    })
    onFormReset()
  }

  return (
    <section className="mb-6 p-4 md:p-6 border border-gray-400/30 rounded bg-gray-500/5">
      <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-400/20 tracking-tight flex items-center gap-2">
        <span>📋</span> Prepare Notes:
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Source of Status:*</label>
            <select id="sourceStatus" value={fields.sourceStatus} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option value="">-- Select --</option>
              <option value="Live Call Rep">Live Call Rep</option>
              <option value="Payer Web Portal">Payer Web Portal</option>
              <option value="IVR Automated System">IVR Automated System</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold uppercase tracking-wide">Clearing House Comment (Please make the changes if required):</label>
            <textarea id="clearinghouseComments" rows={2} value={fields.clearinghouseComments} onChange={handleChange} className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Insurance Name:*</label>
            <input type="text" id="insuranceName" value={fields.insuranceName} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Insurance Phone#:*</label>
            <input type="text" id="insurancePhone" value={fields.insurancePhone} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Rep Name:*</label>
            <input type="text" id="repName" value={fields.repName} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Website Name:*</label>
            <input type="text" id="websiteName" value={fields.websiteName} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Is Coverage Details Available?:*</label>
            <select id="coverageAvailable" value={fields.coverageAvailable} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Policy Effective Date:*</label>
            <input type="date" id="policyEffectiveDate" value={fields.policyEffectiveDate} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Is policy still active?/No Termed Date:*</label>
            <select id="policyActive" value={fields.policyActive} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option value="Yes">Yes</option>
              <option value="No / Terminated">No / Terminated</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Policy Termed Date:</label>
            <input type="date" id="policyTermedDate" value={fields.policyTermedDate} onChange={handleChange} className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Is Policy Active on DOS?:*</label>
            <select id="policyActiveDos" value={fields.policyActiveDos} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">TFL:*</label>
            <input type="text" id="tflValue" value={fields.tflValue} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold uppercase tracking-wide">Claim Mailing Address:*</label>
            <textarea id="claimMailingAddress" rows={2} value={fields.claimMailingAddress} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Is Fax Number provided by rep or available?:*</label>
            <select id="faxProvided" value={fields.faxProvided} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Fax Number:</label>
            <input type="text" id="faxNumber" value={fields.faxNumber} onChange={handleChange} className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Is Payer ID provided by rep or available?:*</label>
            <select id="payerIdProvided" value={fields.payerIdProvided} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Payer ID:*</label>
            <input type="text" id="payerId" value={fields.payerId} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Additional Comment:</label>
            <textarea id="additionalComments" rows={1} value={fields.additionalComments} onChange={handleChange} className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Call Reference#:*</label>
            <input type="text" id="callReference" value={fields.callReference} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide">Action:*</label>
            <select id="actionStatus" value={fields.actionStatus} onChange={handleChange} required className={`p-2 border rounded text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option value="">-- Select --</option>
              <option value="Resubmit Claim">Resubmit Claim</option>
              <option value="Send Appeal with POTF">Send Appeal with POTF</option>
              <option value="Write-off Claim">Write-off Claim</option>
              <option value="Release to Patient">Release to Patient</option>
            </select>
          </div>

        </div>

        {/* Dynamic Bubble Controller Actions Panel */}
        <div className="flex items-center gap-4 max-w-xs sm:max-w-md mx-auto pt-2">
          <button type="submit" className="w-1/2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow text-xs uppercase tracking-wide transition-all">SUBMIT</button>
          <button type="button" onClick={handleReset} className="w-1/2 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow text-xs uppercase tracking-wide transition-all">RESET</button>
        </div>
      </form>
    </section>
  )
}




