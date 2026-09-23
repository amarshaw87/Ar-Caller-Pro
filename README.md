# 📞 AR Caller Pro

An enterprise-grade, high-performance web workspace designed to bridge complex US Healthcare Revenue Cycle Management (RCM) operational business rules with modern frontend engineering patterns.

Instead of generic tutorial applications, this system introduces process automation to optimize manual accounts receivable calling scenarios, denial mitigation paths, and timely filing limit (TFL) claims audit workflows.

## 🛠️ Architecture & Blueprint Topology

The system utilizes a decoupling pattern separating domain tracking modules, global state highways, and local synchronization data states:

Ar-Caller-Pro/
├── .github/
│   └── workflows/
│       └── static.yml          # Production compiler pipeline (GitHub Actions)
├── public/
│   └── images/                 # Image asset paths for scenario layout flowcharts
├── src/
│   ├── data/
│   │   ├── scenarios.json      # DB 1: Data storage for the 60+ Scenarios & Denials
│   │   ├── insurancePh.json    # DB 2: Text records for the Payer Directory List
│   │   ├── tflRules.json       # DB 3: Clear column maps for Timely Filing Limits
│   │   └── contentData.json    # DB 4: Content storage for AR Intro and RCM Steps
│   ├── components/
│   │   ├── Header.jsx          # Top bar navbar + dynamic mode switcher 
│   │   ├── LoginGateway.jsx    # Single-gateway entry form box for all roles
│   │   ├── WorkspaceView.jsx   # Handles conditional page grid loads based on clicks
│   │   ├── FormMatrix.jsx      # Note template inputs grid (Holds 20 structured fields)
│   │   ├── Scratchpad.jsx      # Live editable account-note generation block
│   │   ├── InfoContainer.jsx   # Dynamic rich text handler for AR/RCM descriptive views
│   │   └── Footer.jsx          # Universal footer band (Strictly: © 2026 AR Caller Pro)
│   ├── App.jsx                 # Application core state root hub (Manages Active User Role)
│   ├── index.css               # Code injection framework launching Tailwind directives
│   └── main.jsx                # Core virtual DOM compiler mounting the application
├── index.html                  # Main application structural HTML gateway template frame
├── package.json                # Project dependencies manifest tracking code frameworks
├── postcss.config.js           # Stylesheet transformation parsing script engine config
├── tailwind.config.js          # Core design optimization mapping system configuration tokens
└── vite.config.js              # Primary compilation asset routing deployment rules engine


## ⚙️ Advanced Engineering Highlights

* **Global Event State Orchestration:** Utilizes native React state hooks inside a unified root core hub (`App.jsx`) to manage real-time tracking variables across deeply nested child components without prop-drilling vulnerabilities.
* **Separation of Concerns:** Business mapping logic, database mutations, and input parameters data cleaning (`.trim()`, `.toUpperCase()`, `.sort()`) are fully isolated away from presentation components inside static configuration files.
* **Controlled Modifiers:** Features precise implementation of two-way state binding across an automated, 20-field data entry matrix to allow operator notes to compile dynamically onto interactive browser scratchpads.
* **Data Persistence Engine:** Built-in integration with `localStorage` lifecycle methods ensures that custom data configurations, newly injected telephone logs, and TFL changes are preserved natively in the client cache across window refreshes.
* **Dynamic Content Management:** Complete with custom, administrative authentication gates enabling the site administrator to execute dynamic data downloads to update core layout JSON databases cleanly.

## 🎨 Design System Variables

The application workspace utilizes high-contrast accessibility tokens driven dynamically by a top-level `data-theme` class wrapper toggle:

* **Light Theme State:** Pure solid white background canvas (`#FFFFFF`), pastel light purple layout component bands (`#E6E0F8`), and stark solid black typography font tracking for absolute readability.
* **Dark Theme State:** Deep solid matte black background canvas (`#000000`), rich dark forest green layout component bands (`#0B3F27`), and laser crisp white typography fonts to guarantee optimal visibility.
