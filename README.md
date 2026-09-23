# Ar-Caller-Pro
An interactive Accounts Receivable (AR) call simulator and learning platform for Revenue Cycle Management (RCM).


ar-caller-pro/
├── public/
│   └── images/                 # Repository for visual logic branch charts (.png / .svg)
│       └── no-claim-on-file.png
├── src/
│   ├── data/
│   │   ├── scenarios.json      # DB 1: Data storage for the 60+ Scenarios & Denials
│   │   ├── insurancePh.json    # DB 2: Text records for the Payer Directory List
│   │   ├── tflRules.json       # DB 3: Clear column maps for Timely Filing Limits
│   │   └── contentData.json    # DB 4: Content storage for AR Intro and RCM Steps
│   ├── components/
│   │   ├── Header.jsx          # Top bar navbar + dynamic mode switcher (No Quiz)
│   │   ├── LoginGateway.jsx    # Single-gateway entry form box for all roles
│   │   ├── WorkspaceView.jsx   # Handles conditional page grid loads based on clicks
│   │   ├── FormMatrix.jsx      # Note template inputs grid (Holds 20 structured fields)
│   │   ├── Scratchpad.jsx      # Live editable account-note generation block
│   │   ├── InfoContainer.jsx   # Dynamic rich text handler for AR/RCM descriptive views
│   │   ├── AdminControls.jsx   # Private "Add New" form layout wrappers for data injection
│   │   └── Footer.jsx          # Universal footer band (Strictly: © 2026 AR Caller Pro)
│   ├── App.jsx                 # Application core state root hub (Manages Active User Role)
│   ├── index.css               # Code injection framework launching Tailwind directives
│   └── main.jsx                # Core virtual DOM compiler mounting the application
├── index.html                  # Minimalist root anchor layout housing: <div id="root"></div>
├── tailwind.config.js          # Main tokens tracker mapping your light purple/deep green hex codes
└── package.json                # Project framework configuration dependencies

