<div align="center">

  <img src="https://raw.githubusercontent.com/Donvero/ZAInnovate-Web/main/public/brand/umbono-banner.svg" alt="Umbono AI Education Engine Logo" width="100%" onerror="this.style.display='none'"/>

  # 📚 Umbono: Offline-First AI Education Engine
  ### Sovereign AI Tutoring Platform for Low-Bandwidth & Rural South African Environments

  <p align="center">
    <strong>Proprietary Flagship R&D of ZAInnovate Technologies (Pty) Ltd</strong><br>
    <em>100% Black Youth-Owned National Technology Studio • East London, South Africa • Reg: 2025/572318/07 • B-BBEE Level 1</em><br>
    <strong>"Engineering South Africa's Digital Backbone"</strong>
  </p>

  <p align="center">
    <a href="https://github.com/Donvero/ZAInnovate-Umbono/actions"><img src="https://img.shields.io/badge/PWA-Offline%20Ready-10B981?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready"/></a>
    <a href="#curriculum"><img src="https://img.shields.io/badge/Curriculum-DBE%20CAPS%20%7C%20IEB-0E1B2E?style=for-the-badge&labelColor=FFC20E&color=0E1B2E" alt="DBE CAPS"/></a>
    <a href="#languages"><img src="https://img.shields.io/badge/Languages-isiXhosa%20%7C%20Zulu%20%7C%20Afrikaans%20%7C%20English-1E3557?style=for-the-badge&logo=translate&logoColor=FFC20E" alt="Multilingual"/></a>
    <a href="#b-bbee"><img src="https://img.shields.io/badge/B--BBEE-Level%201%20Contributor-FFC20E?style=for-the-badge&labelColor=0E1B2E&color=FFC20E" alt="B-BBEE Level 1"/></a>
  </p>

  <p align="center">
    <a href="#philosophy">Core Philosophy</a> •
    <a href="#features">Features</a> •
    <a href="#offline-architecture">Offline Architecture</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#curriculum-coverage">Curriculum Coverage</a>
  </p>
</div>

---

## 💡 Architectural Philosophy: Zero-Bandwidth Equity

In South Africa, access to high-speed internet remains deeply divided along socioeconomic lines. Students in rural Eastern Cape, Limpopo, KwaZulu-Natal, and township schools often lack the continuous data bundles required for conventional cloud-based educational platforms.

**Umbono** reimagines EdTech by putting **offline capability first**:
- **Zero Cellular Data Burden**: Students download curriculum modules over school Wi-Fi or zero-rated public networks, allowing hours of uninterrupted home study without using a single megabyte.
- **Micro-Burst Delta Synchronization**: Completed quizzes and progress telemetry are queued locally and uploaded in tiny $(< 50\text{ KB})$ packets when an opportunistic connection is found.
- **Multilingual Code-Switching AI**: First-class support for African languages, enabling students to learn complex STEM concepts in **isiXhosa, isiZulu, Afrikaans, and English**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   UMBONO ZERO-BANDWIDTH PIPELINE                       │
├────────────────────┬───────────────────────────┬───────────────────────┤
│   SCHOOL / WI-FI   │    OFFLINE HOME STUDY     │  OPPORTUNISTIC SYNC   │
│ • One-click bundle │  • 100% Local lessons     │  • Automatic upload   │
│ • ~30MB per subject│  • On-device math solver  │  • Tiny <50KB packet  │
│ • Zero data cost   │  • Multilingual AI Tutor  │  • Teacher dashboard  │
└────────────────────┴───────────────────────────┴───────────────────────┘
```

---

## ✨ Key Capabilities & Features

### 1. Dual-Layer Offline Storage (IndexedDB + ServiceWorker)
- High-performance caching of structured lessons, diagrams, formulas, and audio clips using browser-native storage.
- Full progressive web app (PWA) installable on mobile phones, tablets, and low-cost laptops.

### 2. DBE CAPS & IEB Curriculum Alignment
- Rigorously mapped to South African Department of Basic Education (DBE) Curriculum and Assessment Policy Statements.
- Grades 8–12 coverage focusing on high-impact STEM subjects:
  - **Mathematics** (Algebra, Trigonometry, Calculus, Euclidean Geometry)
  - **Physical Sciences** (Mechanics, Electricity, Chemistry, Waves)
  - **Coding & Robotics** (Python, Algorithmics, Automation)
  - **Life Sciences & Accounting**

### 3. Multilingual Sovereign AI Tutor
- Contextual tutoring that switches between English and South African indigenous languages (isiXhosa, isiZulu, Afrikaans).
- Bridges pedagogical gaps by explaining rigorous scientific terminology using culturally relevant analogies.

### 4. Resilient Conflict-Free Sync Engine
- Uses deterministic timestamp ordering and optimistic UI states.
- Ensures zero work or exam answers are lost, even during sudden power cuts or network drops.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router & Static Optimization)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS with ZAInnovate Navy (`#0E1B2E`) and Gold (`#FFC20E`)
- **Offline Storage**: IndexedDB (via `idb`) + Cache API Service Worker
- **Database & Server Models**: PostgreSQL 16 + Prisma ORM
- **Icons**: Lucide React
- **PWA Capabilities**: Service Worker caching, Web App Manifest, Background Sync

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- Modern browser with Service Worker and IndexedDB support (Chrome, Edge, Firefox, Safari)
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/Donvero/ZAInnovate-Umbono.git
cd ZAInnovate-Umbono
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Disconnect your internet connection or use Chrome DevTools "Offline" preset to test the zero-bandwidth offline experience!

---

## 🏫 Curriculum & Subject Coverage

| Subject | Grade Range | Language Support | Offline Pack Size |
| :--- | :--- | :--- | :--- |
| **Mathematics** | Grade 8 – 12 | isiXhosa, English, Zulu | ~38 MB |
| **Physical Sciences** | Grade 10 – 12 | English, isiXhosa, Afrikaans | ~42 MB |
| **Coding & Robotics** | Grade 8 – 12 | English, isiXhosa | ~25 MB |
| **Life Sciences** | Grade 10 – 12 | English, Zulu, isiXhosa | ~35 MB |
| **Accounting** | Grade 10 – 12 | English, Afrikaans | ~20 MB |

---

## 🏢 Corporate Governance

**ZAInnovate Technologies (Pty) Ltd**  
- **Registration**: 2025/572318/07  
- **B-BBEE Status**: Level 1 Contributor (100% Black Youth Owned)  
- **Headquarters**: East London, Eastern Cape, South Africa  
- **Mission**: *"Engineering South Africa's Digital Backbone"*  
- **Email**: `education@zainnovate.co.za` | `contact@zainnovate.co.za`  

---

<div align="center">
  <sub>Umbono is sovereign intellectual property engineered by ZAInnovate Technologies (Pty) Ltd. Built with pride in the Eastern Cape, South Africa.</sub>
</div>
