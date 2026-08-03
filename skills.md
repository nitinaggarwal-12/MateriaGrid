# Agent Tooling & Skill Execution Specifications (MateriaGrid / OpenRepertory)

This file defines the procedural code hooks, validation schemas, and execution constraints made available to the agents defined in `agents.md`. Every skill enforces strict typing, error handling, and zero-shortcut rules.

---

## 1. Skill: Semantic Rubric Lookup
*   **Skill ID:** `skill_semantic_rubric_lookup`
*   **Target Agent:** `clinical_intake_agent`, `repertory_orchestrator`
*   **Implementation Pattern:** Vector database lookup using PostgreSQL `pgvector` (`hnsw` cosine distance index) combined with historical medical synonym fallback.
*   **Parameters:**
    *   `query_string` (string, required): Raw text snippet spoken by the user or patient.
    *   `threshold` (float, required): Minimum similarity index value between `0.00` and `1.00`. Default is `0.75`.
    *   `limit` (integer, optional): Maximum quantity of matching entries to pull. Default is `25`.
    *   `methodology_filter` (string, optional): `'SEHGAL_PPP'` | `'BONNINGHAUSEN_COMPONENTS'` | `'GENERAL'`.
*   **Strict Processing Rules:** If the vector cosine search yields zero results above the threshold, the tool automatically executes an algorithmic query rewriting phase using a historical medical synonym mapping dictionary (e.g., translating modern `"panic attack"` or `"throbbing migraine"` to historical rubrics like `"MIND - FEAR - happen, something will"` or `"HEAD - PAIN - pulsating"`).

---

## 2. Skill: Matrix Repertorization Calc
*   **Skill ID:** `skill_matrix_repertorization_calc`
*   **Target Agent:** `repertorization_engine`
*   **Implementation Pattern:** Isolated deterministic data processing pipeline running directly inside PostgreSQL aggregations and TypeScript mathematical engine.
*   **Parameters:**
    *   `selected_rubric_ids` (array of strings, required): List of uniquely structured rubric UUID keys selected for evaluation.
    *   `elimination_rubric_ids` (array of strings, optional): Filter criteria specifying that remedies *must* possess these specific rubric codes to even be included in results.
    *   `deduplication_clusters` (array of arrays of strings, optional): Group keys of synonymous rubrics (e.g., identical clinical meanings recorded under different historical headings).
    *   `thermal_thirst_mask` (object, required): `PatientThermalThirstAxis` object containing immutable `thermal`, `thirst`, and `laterality` constants.
    *   `icd11_diagnostic_tags` (array of strings, optional): Diagnostic codes to trigger the Burnett Organopathy & Tissue Drainage Override if structural disease is present.
    *   `miasmatic_focus` (array of strings, optional): List of active miasms (`'PSORA'`, `'SYCOSIS'`, `'SYPHILIS'`, `'TUBERCULAR'`) for 1.5x weighting multiplier.
*   **Validation Constraint:** Reject any request with an empty `selected_rubric_ids` payload.
*   **Deduplication & Specificity Rules:**
    1. If multiple selected rubric IDs belong to the same deduplication cluster, apply only the *maximum single grade* scored within that cluster rather than summing them cumulatively.
    2. Compute the Inverse Rubric Density log scoring formula (TF-IDF equivalent) so rare small remedies score fairly against broad polychrests.
    3. If `icd11_diagnostic_tags` indicate severe structural organ breakdown, return separate `organopathic_drainage_track` and `constitutional_track` results with potency ceiling protections.

---

## 3. Skill: Bulk DB Insert & Upsert
*   **Skill ID:** `skill_bulk_db_upsert`
*   **Target Agent:** `data_ingestion_agent`
*   **Implementation Pattern:** Highly performant batch relational transactions with foreign key safety pragmas.
*   **Parameters:**
    *   `target_table` (string, required): Explicitly either `'remedies'`, `'rubrics'`, or `'rubric_remedy_matrix'`.
    *   `records_json_payload` (array of objects, required): Fully populated records to inject.
*   **Anti-Shortcut Constraint:** The database engine will reject partial rows or missing reference constraints. The agent must parse and validate that every item contains valid, non-null structural IDs, grades (`1..4`), and required metadata before executing this tool.

---

## 4. Skill: Code Generation & Compilation Verification
*   **Skill ID:** `skill_compile_verify`
*   **Target Agent:** `repertory_orchestrator`
*   **Implementation Pattern:** Execution of script-checking micro-compilers and functional automated test suites.
*   **Parameters:**
    *   `source_code` (string, required): Clean TypeScript/JavaScript file structure.
    *   `test_suite` (string, required): Functional unit test assertions verifying functionality.
*   **Execution Rule:** Run tests on the generated output automatically. If coverage lands below 100% or tests fail, capture the diagnostic compilation trace, isolate the missing blocks, and rewrite the logic immediately without querying the user.

---

## 5. Skill: Active Session State Caching
*   **Skill ID:** `skill_session_state_cache`
*   **Target Agent:** `repertory_orchestrator`, `repertorization_engine`
*   **Implementation Pattern:** Memory-mapped application state cache with incremental delta mutation.
*   **Parameters:**
    *   `session_id` (string, required): Unique UUID for the active patient consultation case.
    *   `action` (string, required): Explicitly either `'PUSH_SYMPTOM'`, `'REMOVE_SYMPTOM'`, or `'PATCH_GRADE'`.
    *   `payload` (object, required): Target symptom keys and modified grade integers.
*   **No-Shortcut Rule:** This tool must compute incremental difference updates (deltas) instead of resetting or reloading the global application memory array. If a user deletes a symptom, subtract its corresponding weights from the active cache matrix to eliminate rendering lag.

---

## 6. Skill: Intent Disambiguation Gateway
*   **Skill ID:** `skill_disambiguation_gateway`
*   **Target Agent:** `clinical_intake_agent`
*   **Parameters:**
    *   `matches` (array of objects, required): Raw list of candidate rubric codes alongside semantic similarity floats.
*   **Rule:** If a semantic lookup yields more than 3 high-confidence matches (>0.85 similarity), the agent must output a structured interactive array options payload to the user interface rather than dynamically guessing or auto-selecting the rubric, empowering the practitioner to visually disambiguate.

---

## 7. Skill: Multimodal Lesion Profiler
*   **Skill ID:** `skill_multimodal_lesion_profiler`
*   **Target Agent:** `multimodal_vision_agent`
*   **Implementation Pattern:** Direct spatial image canvas matrix analysis.
*   **Parameters:**
    *   `image_base64_payload` (string, required): Raw image stream string of the targeted body region.
    *   `body_part_location_tag` (string, required): Anatomical zone tracking filter (e.g., "Left Forearm", "Face").
*   **Execution Logic:** Perform structural feature analysis against clinical color charts. If multiple overlapping textures match (e.g., scaly yet bleeding), the tool must map separate candidate keys with separate confidence score decimals rather than averaging them into a single guess.

---

## 8. Skill: Video Motion Sequence Frame Parser
*   **Skill ID:** `skill_video_motion_frame_parser`
*   **Target Agent:** `multimodal_vision_agent`
*   **Implementation Pattern:** Multi-frame sequence time-series feature evaluator.
*   **Parameters:**
    *   `video_stream_uri` (string, required): Cloud path or direct file stream of patient movement video.
    *   `tracking_focus` (string, required): Explicitly either `GAIT_POSTURE`, `FACIAL_SPASM`, or `JOINT_FLEXION`.
*   **No-Shortcut Rule:** Do not evaluate only the first frame. The tool must sample up to 24 keyframes across the timeline sequence to parse directional acceleration and posture degradation shifts.

---

## 9. Skill: Laboratory Diagnostics Parser
*   **Skill ID:** `skill_lab_diagnostics_parser`
*   **Target Agent:** `diagnostic_report_agent`
*   **Implementation Pattern:** Layout-aware textual extraction combined with structural image matrix parsing.
*   **Parameters:**
    *   `document_blob_url` (string, required): Secure bucket tracking link containing the uploaded PDF report or scan image.
    *   `report_modality` (string, required): Explicitly either `BLOOD_PANEL`, `BIOPSY_HISTOPATHOLOGY`, `XRAY_RAD`, or `MRI_STRUCTURAL`.
*   **No-Shortcut Rule:** The tool must parse the entire alphanumeric list of lab values, including explicit flags for reference intervals. It cannot ignore pages or skip trailing summaries.
