# MateriaGrid Production Development Manifest

## 1. System Dependency Matrix
- **Database Engine**: Supabase PostgreSQL v15+ with `pgvector` (1536-dimensional HNSW Indexing)
- **Logic State Router**: Next.js 14 (App Router Architecture, Node.js v20 Long-Term Support Runtime)
- **Visual Presentation**: TanStack Virtualized Table v8 with Tailwind CSS Utility Framework

## 2. Unalterable File Map Constraints
All autonomous agent sub-routines must build within, map against, and preserve connections across these core nodes:
1. `database/schema.sql` -> Structural Relational Networks (`001_materiagrid_schema.sql`)
2. `database/003_vector_functions.sql` -> PostgreSQL HNSW Cosine Distance Evaluation (`match_rubrics_by_embedding`)
3. `database/002_materiagrid_seed.sql` -> 15-Remedy Production Seed Core
4. `src/lib/engine/synonyms.ts` -> Explicit Homeopathic Synonym & Deduplication Cluster Map
5. `src/lib/engine/repertorization.ts` -> Asymmetrical Specificity Inverse Core Calculations (TF-IDF, Vijayakar Thermal-Thirst Mask, Burnett Organopathy Override)
6. `src/components/dashboard/WorkspaceMatrix.tsx` -> Ultra-Dense Dual-Sticky UI Layout Canvas (`@tanstack/react-virtual`, neon-mint visual grade continuum)
7. `src/app/api/intake/route.ts` -> Pure Natural Language Parsing Pipeline Gateway (Sehgal ROH + Bönninghausen component parser)

## 3. Runtime Verification Routine
Before marking a development tier complete, the system compiler must verify:
- Zero dependency version mismatch drift inside `package.json`.
- Database joins resolve within a 45ms transaction window via automated raw SQL query checks.
- Browser UI frames render at a continuous 60FPS during scrolling sweeps under virtualized loads of up to 5,000 active rubric entries.
