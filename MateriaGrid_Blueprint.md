# MATERIAGRID — MASTER SOFTWARE REQUIREMENT SPECIFICATION & ARCHITECTURAL BLUEPRINT

**Primary Application Title:** MateriaGrid  
**Underlying Mathematical Protocol:** The SimiliMatrix Index Engine  
**Official System Subtext:** *"The Advanced Multi-Axis Repertorization & Core Case Intelligence Engine."*  

---

## 1. Executive Summary & Brand Positioning

**MateriaGrid** is a legally clear, clinically profound, and ultra-high-density homeopathic analysis platform engineered specifically for busy Indian outpatient clinics (OPD), medical colleges (BHMS/MD level), and classical practitioners worldwide.

It bridges 200 years of classical homeopathic literature with ultra-modern data science:
* **Market Position:** #1 dedicated clinical spreadsheet matrix for multi-axis repertorization.
* **Domain Recognition:** Instantly recognizable to BHMS practitioners—welding *Materia* (the study of remedies and materia medica) to *Grid* (the hyper-dense, virtualized visual matrix).
* **Clinical Superiority:** Eliminates the "Polychrest Dominance Paradox" using Asymmetrical TF-IDF Inverse Rubric Density scoring, enforces Dr. Vijayakar's Predictive Thermal-Thirst Mask, tracks Dr. Sehgal's PPP Mind behavioral expressions, and integrates Dr. Burnett's Organopathy & Tissue Drainage safety track for severe structural pathologies.

---

## 2. Global Multi-Agent Engine Architecture

MateriaGrid executes across four distinct, strictly governed agent pipelines running under the Google Agent Development Kit (ADK) architecture:

```
                  [ Root Node: repertory_orchestrator ]
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
[ data_ingestion_agent ]   [ repertorization_engine ]  [ clinical_intake_agent ]
```

1. **`repertory_orchestrator`**: Central routing switchboard, anti-mocking verification guardrail, zero-shortcut execution controller, and phase-gate enforcer.
2. **`data_ingestion_agent`**: Stateless streaming ingestion engine parsing historical repertory texts, font grading hierarchies (`Grade 1..4`), and biological taxonomies directly into PostgreSQL.
3. **`repertorization_engine`**: Deterministic asymmetrical mathematical solver executing SQL-native aggregations and TypeScript computation for Asymmetrical Specificity Scores, Thermal-Thirst masks, Miasmatic multipliers, and Burnett Organopathy tracks.
4. **`clinical_intake_agent`**: Semantic vector processing pipeline (`pgvector`) translating conversational patient narrative into Sehgal PPP Mind rubrics and Bönninghausen deconstructed physical components with explicit human Audit Log sign-offs.

---

## 3. Core Clinical & Mathematical Innovations

### 3.1 Asymmetrical Specificity Index Formula (Anti-Polychrest Dominance)
Broad remedies (*Sulphur*, *Arsenicum*, *Lycopodium*) naturally hit hundreds of common symptoms by sheer document volume. To ensure rare, targeted remedies surface accurately when a patient presents a peculiar symptom, MateriaGrid calculates:

$$S_{\text{remedy}} = \sum_{i \in R} \left( \text{Grade}_{i} \times \log_2\left( \frac{N_{\text{total\_remedies}}}{\max(n_{\text{remedies\_in\_rubric}_{i}}, 1)} \right) \right)$$

### 3.2 Dr. Prafull Vijayakar Predictive Thermal-Thirst Mask
Before ranking remedies, the engine evaluates three immutable physical constants:
$$\text{Baseline Profile} = \begin{cases} \text{Thermal:} & \text{HOT \ \vert \ CHILLY \ \vert \ AMBITHERMAL} \\ \text{Thirst:} & \text{THIRSTY \ \vert \ THIRSTLESS \ \vert \ VARIABLE} \\ \text{Laterality:} & \text{LEFT \ \vert \ RIGHT \ \vert \ ALTERNATING \ \vert \ SYMMETRICAL} \end{cases}$$
Any remedy whose biological database profile directly contradicts the patient's baseline (e.g., prescribing a strictly `Chilly + Thirsty` remedy to a `Hot + Thirstless` patient) is automatically suppressed or flagged.

### 3.3 Dr. J.C. Burnett Organopathy & Tissue Drainage Override
If the consultation input flags an ICD-11 structural disease tag (e.g., severe liver cirrhosis, end-stage renal failure, heart failure), MateriaGrid automatically splits the diagnostic recommendations into two distinct tracks:
1. **Organopathic / Tissue Drainage Track:** Low-potency organ-affine remedies (*Chelidonium*, *Solidago*, *Crataegus*, *Carduus marianus*).
2. **Constitutional Totality Track:** Deep constitutional remedies accompanied by an explicit software potency ceiling warning prohibiting potencies above 30C/200C without practitioner sign-off.

---

## 4. Visual Identity & Ultra-High-Density Workspace System

* **Theme:** Deep charcoal dark-mode clinic workspace (`#111215`) to eliminate eye fatigue during multi-hour OPD sessions.
* **Separators:** Fine slate grid lines (`#262830`) with compressed internal cell padding (`max-w-[1600px]`, `px-4 py-1`).
* **Visual Grade Continuum:**
  * **Grade 4 (Utmost prominence):** Solid glowing neon-mint emerald text (`#10B981`) + subtle mint background highlight.
  * **Grade 3 (Strongly verified):** Bright mint green text (`#34D399`).
  * **Grade 2 (Verified clinical):** Soft teal green text (`#6EE7B7`).
  * **Grade 1 (Reported symptom):** Muted slate-mint outline (`#9CA3AF`).
* **Interactive Practitioner Audit Log:** Every AI-extracted symptom presents an explicit "Accept / Reject" toggle committed directly into the consultation session audit record.
