# 🏦 BankerOS — Interactive Banker's Algorithm & Deadlock Avoidance Simulator

> **A visionOS & Apple Liquid Glass inspired educational operating systems laboratory for simulating, visualizing, and mastering Dijkstra's Banker's Algorithm and Deadlock Avoidance.**

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-f08.svg)](https://www.framer.com/motion/)
[![Tests Passing](https://img.shields.io/badge/Tests-100%25_Passing-brightgreen.svg)]()
[![Type](https://img.shields.io/badge/Architecture-Frontend--Only_Client--Side-informational.svg)]()

---

## 🌟 Executive Overview

**BankerOS** is a complete, interactive, frontend-only simulator for operating systems education. Designed with a stunning **Apple Liquid Glass / visionOS** design language, it transforms abstract OS deadlock avoidance concepts into an intuitive, visually responsive, and mathematically rigorous experience.

All algorithm calculations—matrix subtractions, vector inequalities, trial state allocations, and safe trajectory searches—execute **100% locally in the browser** using verified JavaScript algorithms with zero backend or database dependencies.

---

## 🔬 Core Algorithms Implemented

### 1. Safety Algorithm (Deadlock Avoidance)
Mathematically evaluates whether the system is in a **Safe State** where all processes can terminate without circular wait:
1. **Initialize Vectors**: $\text{Work} = \text{Available}$, $\text{Finish}[i] = \text{false} \;\; \forall i \in [0, n-1]$.
2. **Find Eligible Process**: Identify an unfinished process $P_i$ ($\text{Finish}[i] == \text{false}$) such that:
   $$\text{Need}[i] \le \text{Work}$$
3. **Reclaim Resources**: If found, simulate completion and resource reclamation:
   $$\text{Work} = \text{Work} + \text{Allocation}[i]$$
   $$\text{Finish}[i] = \text{true}$$
   Append $P_i$ to the Safe Sequence.
4. **Iterate**: Repeat until all processes finish ($\text{Safe State}$) or no further progress can be made ($\text{Unsafe State / Deadlock Hazard}$).

### 2. Resource Request Algorithm
Handles dynamic runtime requests from processes with two fundamental safety gates:
- **CHECK 1 (Claim Bound)**: $\text{Request}[i] \le \text{Need}[i]$. If false, generates error condition (process exceeded declared maximum claim).
- **CHECK 2 (Availability Bound)**: $\text{Request}[i] \le \text{Available}$. If false, places process in $\text{WAIT}$ state due to insufficient resources.
- **Trial Allocation & Rollback**:
  $$\text{Available}_{\text{trial}} = \text{Available} - \text{Request}$$
  $$\text{Allocation}_{\text{trial}}[i] = \text{Allocation}[i] + \text{Request}$$
  $$\text{Need}_{\text{trial}}[i] = \text{Need}[i] - \text{Request}$$
  Runs the Safety Algorithm on the trial state:
  - If **Safe**: Request is **GRANTED** $\to$ State changes committed.
  - If **Unsafe**: Request is **DENIED** $\to$ Changes immediately **ROLLED BACK** to original state.

---

## 💎 Design & Visual Aesthetics

Inspired by **Apple visionOS** and **macOS Tahoe / Liquid Glass**:
- **Deep Space Obsidian Palette**: Deep `#05070f` backdrop with ambient animated radial light spots.
- **Frosted Translucent Glass**: `backdrop-blur-3xl`, `bg-slate-900/60`, specular top-edge reflections, and custom colored border glows.
- **Micro-Animations & Physics**: Spring transitions powered by Framer Motion.
- **Dynamic Acoustics**: Built-in Web Audio API synthesizer generating delicate glass clicks, harmonious execution chimes, and soft warning tones without external audio files.
- **Celebration Feedback**: Canvas confetti bursts upon achieving verified safe execution sequences.

---

## 📑 Application Navigation & Feature Modules

| Module | Purpose & Features |
| :--- | :--- |
| **1. Overview** | Executive dashboard with dynamic stat cards, resource distribution charts (Recharts), process completion ratios, and live safety status badge. |
| **2. Safety Algorithm** | Interactive step-by-step visualizer with Play/Pause, Speed controls (0.5x–4x), Work & Finish vector updates, and animated safe sequence build-up. |
| **3. Resource Request** | Interactive test bench with process selectors, slider inputs, real-time Check 1 & Check 2 progress gauges, trial state inspection, and rollback confirmation. |
| **4. Allocation Matrix** | Fully editable live matrix editor. Add/remove processes, add/remove resources, rename entities, and test live constraints with automatic Need calculation. |
| **5. Execution Visualizer** | Central Bank architectural diagram showing resources flowing between bank and process nodes across states: `Waiting`, `Eligible`, `Executing`, `Completed`, `Blocked`. |
| **6. Learn Banker's** | Comprehensive educational textbook masterclass covering Deadlock conditions, Dijkstra's analogy, mathematical foundations, and an interactive quiz. |
| **7. Settings** | Persistence hub with JSON export/import, audio preferences, playback speed settings, and curated demonstration presets. |

---

## 📊 Standard Sample Verification Data

BankerOS is verified against the canonical textbook example:

- **Processes**: $P_0, P_1, P_2, P_3, P_4$
- **Resources**: $A, B, C$
- **Available**: $[3, 3, 2]$

$$\text{Allocation} = \begin{bmatrix} 0 & 1 & 0 \\ 2 & 0 & 0 \\ 3 & 0 & 2 \\ 2 & 1 & 1 \\ 0 & 0 & 2 \end{bmatrix}, \quad \text{Max} = \begin{bmatrix} 7 & 5 & 3 \\ 3 & 2 & 2 \\ 9 & 0 & 2 \\ 2 & 2 & 2 \\ 4 & 3 & 3 \end{bmatrix}$$

$$\text{Calculated Need} = \text{Max} - \text{Allocation} = \begin{bmatrix} 7 & 4 & 3 \\ 1 & 2 & 2 \\ 6 & 0 & 0 \\ 0 & 1 & 1 \\ 4 & 3 & 1 \end{bmatrix}$$

**Verified Safe Sequence**:
$$\langle P_1 \to P_3 \to P_4 \to P_0 \to P_2 \rangle$$

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### 2. Installation
Open your terminal in the project directory:
```bash
npm install
```

### 3. Running the Simulator
Start the Vite development server:
```bash
npm run dev
```
Open your browser at: `http://localhost:5173`

### 4. Running the Automated Test Suite
Run the mathematical verification suite:
```bash
npm test
```

All 8 core algorithm and validation test suites will run and report status in your terminal.

---

## 🏛️ Project Structure

```
bankeros/
├── index.html                     # Entry HTML with visionOS typography
├── package.json                   # Dependencies and npm scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration with iOS glass theme
├── postcss.config.js              # PostCSS plugins
│
├── src/
│   ├── algorithms/                # Core OS Mathematical Algorithms
│   │   ├── safetyAlgorithm.js     # Safety Algorithm & step trace generator
│   │   ├── resourceRequest.js     # Resource Request Algorithm & rollback
│   │   ├── validation.js          # Matrix & input validation engine
│   │   └── __tests__/             # Automated test suite
│   │       ├── banker.test.js     # Vitest spec
│   │       └── verify.js          # Direct Node.js ESM verification test runner
│   │
│   ├── components/                # Modular Reusable UI Components
│   │   ├── Sidebar.jsx            # Liquid Glass navigation sidebar
│   │   ├── Topbar.jsx             # Top bar with live status & controls
│   │   ├── GlassCard.jsx          # VisionOS translucent glass card
│   │   ├── StatCard.jsx           # Animated counter cards
│   │   ├── MatrixTable.jsx        # Editable & readable matrix tables
│   │   ├── SimulationControls.jsx # Playback stepper & scrubber
│   │   ├── ExecutionTimeline.jsx  # Interactive step timeline
│   │   └── ResourceVisualizer.jsx # Central Bank architectural node diagram
│   │
│   ├── data/                      # Initial Datasets & Curated Scenarios
│   │   ├── initialData.js         # Canonical textbook sample data
│   │   └── presets.js             # Textbook, Deadlock Danger, Tight Margin presets
│   │
│   ├── hooks/
│   │   └── useSimulation.js       # Central React simulation state hook
│   │
│   ├── pages/                     # Application Pages
│   │   ├── Dashboard.jsx          # Overview analytics dashboard
│   │   ├── SafetyAlgorithm.jsx    # Safety algorithm visualizer
│   │   ├── ResourceRequest.jsx    # Resource request simulator
│   │   ├── AllocationMatrix.jsx   # Live editable matrix tables
│   │   ├── ExecutionVisualizer.jsx# Central Bank visualizer
│   │   ├── Learn.jsx              # Comprehensive educational masterclass
│   │   └── Settings.jsx           # Preferences & state persistence
│   │
│   ├── styles/
│   │   └── global.css             # Tailwind layers & ambient lighting effects
│   │
│   ├── utils/
│   │   └── audio.js               # Web Audio API futuristic sound synthesizer
│   │
│   ├── App.jsx                    # Root application component
│   └── main.jsx                   # React entry point
└── README.md                      # Project documentation
```

---

## 🎓 Academic Demonstration Guide (For Professors & Students)

When demonstrating BankerOS to an Operating Systems professor:
1. **Open Overview**: Point out the dynamic metrics, the real-time resource allocation chart, and the live system health indicator.
2. **Demonstrate Safety Algorithm**: Go to the **Safety Algorithm** page. Click **Play** to watch the algorithm step through each process ($P_1 \to P_3 \to P_4 \to P_0 \to P_2$), observing how the Work vector incrementally expands as finished processes return their allocations.
3. **Create an Unsafe State**:
   - Go to **Allocation Matrix**.
   - Change the **Available** vector from `[3, 3, 2]` to `[0, 1, 0]` (or select the **Deadlock Danger** preset).
   - Return to **Safety Algorithm** and click **Run**. Observe the warning animation explaining that no process's Need can be satisfied, demonstrating deadlock hazard.
4. **Demonstrate Resource Request Algorithm**:
   - Go to **Resource Request**.
   - Select process **P1** and request `[1, 0, 2]`. Observe Check 1 passing ($\text{Request} \le \text{Need}$), Check 2 passing ($\text{Request} \le \text{Available}$), trial safety check passing, and the request being **GRANTED**.
   - Next, select process **P4** and request `[3, 3, 0]`. Both Check 1 and Check 2 pass, but the trial safety check detects an unsafe state. Watch the simulator **DENY** the request and **ROLL BACK** all trial modifications.
5. **Interactive Central Bank Visualization**: Switch to **Execution Visualizer** to show the animated flow between the Central Bank resource pool and process nodes in real time.

---

*Engineered with precision for Operating Systems education.*
