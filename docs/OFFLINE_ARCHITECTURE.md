# Umbono Offline-First Architecture & Engineering Blueprint

> **Proprietary & Sovereign Intellectual Property of ZAInnovate Technologies (Pty) Ltd**  
> Company Reg: 2025/572318/07 | B-BBEE Level 1 Contributor | East London, Eastern Cape, South Africa  
> *"Engineering South Africa's Digital Backbone"*

---

## 1. The Low-Bandwidth Reality in South Africa

Over 70% of South African high school learners in public quintile 1 to 3 schools experience persistent cellular data poverty or intermittent grid electricity (load shedding). Modern cloud-dependent EdTech tools that require continuous 4G/5G connections fail the students who need them most.

**Umbono** was designed from the ground up under a **Zero-Bandwidth First** architectural philosophy:
- **Zero data cost during active study**: All curricular materials, diagrams, exercises, and interactive lessons run 100% locally on the device once cached.
- **Opportunistic Synchronization**: Sync happens in micro-bursts whenever the learner is near a zero-rated educational hotspot, school Wi-Fi, or public library.
- **Extreme Payload Compression**: Sync packets are constrained to $< 50\text{ KB}$ per payload.

```mermaid
flowchart TD
    subgraph Client Device (Browser / PWA)
        UI["Umbono PWA Frontend"]
        SW["Service Worker (Asset & Shell Cache)"]
        IDB[("IndexedDB (Lessons, Quizzes, Sync Queue)")]
        ONNX["Local Quantized SLM / Inference Engine"]
    end

    subgraph Opportunistic Uplink
        SYNC["Delta Sync Coordinator"]
    end

    subgraph Sovereign Cloud (ZA Data Center)
        API["Sync & Evaluation Microservice"]
        DB[("PostgreSQL Master Database")]
    end

    UI --> SW
    UI --> IDB
    UI --> ONNX
    IDB --> SYNC
    SYNC -.->|Micro-burst when online| API
    API --> DB
```

---

## 2. Two-Tier Client Storage Architecture

Umbono isolates static instructional media from dynamic student telemetry using two distinct browser storage layers:

### Tier 1: Service Worker Cache (`CacheStorage`)
- **Cached Content**: Pre-rendered Next.js page shells, web fonts, optimized WebP diagrams, and compressed audio pronunciation clips.
- **Strategy**: Cache-First with background revalidation. If network latency $> 800\text{ms}$ or offline, serves immediately from local cache.

### Tier 2: IndexedDB (`umbono_offline_store`)
- **Stores**:
  1. `lessons`: Full structured markdown courseware, formula sheets, and step-by-step problem walkthroughs.
  2. `syncQueue`: Student assessment answers, quiz results, and diagnostic telemetry submitted while disconnected.
  3. `metadata`: Bandwidth metrics, download timestamps, and student profile preferences.

---

## 3. Micro-Burst Delta-Sync Protocol

When network connectivity is detected via `navigator.onLine` and `window.addEventListener('online')`:

1. **State Evaluation**: The `DeltaSyncCoordinator` inspects `syncQueue` for records where `synced: false`.
2. **Payload Compaction**: Submissions are packed into a compact binary JSON payload featuring:
   - Student ID hash
   - Lesson ID
   - Timestamp of completion
   - Raw response text and multiple-choice selections
3. **Optimistic Confirmation**: The UI marks items as tentatively saved locally; server responses confirm reconciliation without interrupting the learner.
4. **Conflict Resolution**: Client-wins timestamp resolution for student progress records to prevent server race conditions.

---

## 4. Multilingual Sovereign AI & Quantized On-Device SLM

South African education requires multilingual competence. Concepts in Physical Sciences and Mathematics are frequently taught through code-switching between English, isiXhosa, and Zulu.

Umbono accommodates this through:
- **Local Rule-Based Symbolic Solvers**: Fast offline mathematical equation parsers and step-by-step factoring engines.
- **Lightweight Quantized On-Device Model**: ONNX-runtime compatible 4-bit quantized Small Language Models capable of executing localized STEM clarifications in isiXhosa, Zulu, Afrikaans, and English without network roundtrips.

---

## 5. DBE CAPS Alignment & Curriculum Verification

All course materials in Umbono strictly mirror the **Department of Basic Education (DBE) Curriculum and Assessment Policy Statement (CAPS)**:
- Grade 8–9: Natural Sciences, Mathematics, Technology
- Grade 10–12: Mathematics, Physical Sciences, Life Sciences, Coding & Robotics, Accounting

Each module is mapped to DBE term timetables, standard exam guidelines, and past National Senior Certificate (NSC) papers.

---

*Copyright © 2026 ZAInnovate Technologies (Pty) Ltd. All rights reserved.*
