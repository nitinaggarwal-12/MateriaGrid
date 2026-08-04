'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
  Activity,
  UserCheck,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
  Flame,
  Droplets,
  Zap,
} from 'lucide-react';

interface BhmsClinicalAcademyViewProps {
  theme?: 'dark' | 'light';
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface CourseModule {
  id: string;
  code: string;
  title: string;
  instructor: string;
  duration: string;
  level: 'BHMS INTERN' | 'MD (HOM.) RESIDENT' | 'AYUSH FACULTY';
  chaptersCount: number;
  progressPercent: number;
  summary: string;
  chapters: { title: string; duration: string; completed: boolean }[];
  quiz: QuizQuestion[];
}

const ACADEMIC_COURSES: CourseModule[] = [
  {
    id: 'course-01',
    code: 'BHMS-401',
    title: 'Dr. Prafull Vijayakar’s Predictive Homeopathy & Thermal-Thirst Baseline Physics',
    instructor: 'Prof. Dr. Nitin Aggarwal, MD (Hom.)',
    duration: '4.5 Hours • 6 Chapters',
    level: 'BHMS INTERN',
    chaptersCount: 6,
    progressPercent: 66,
    summary:
      'Master the physics of immutable physical baseline constants—Thermal (Hot/Chilly) and Thirst (Thirsty/Thirstless)—to eliminate genetic suppression and prescribe safely.',
    chapters: [
      { title: 'Chapter 1: The Thermodynamics of Living Cells & Miasmatic Bias', duration: '40 mins', completed: true },
      { title: 'Chapter 2: Defining Hot vs Chilly and Thirsty vs Thirstless Baselines', duration: '45 mins', completed: true },
      { title: 'Chapter 3: Embryological Layer Progression (Endoderm → Mesoderm → Ectoderm)', duration: '50 mins', completed: true },
      { title: 'Chapter 4: Preventing Suppression: Why Chilly Remedies Fail in Hot Patients', duration: '45 mins', completed: true },
      { title: 'Chapter 5: SimiliMatrix Asymmetrical TF-IDF Scoring Integration', duration: '45 mins', completed: false },
      { title: 'Chapter 6: Case Verification & Follow-Up Hering’s Law Audit', duration: '45 mins', completed: false },
    ],
    quiz: [
      {
        id: 'q1',
        question:
          'A 42-year-old corporate entrepreneur presents with acute throbbing migraine when the sun sets. He is HOT and THIRSTLESS, and demands immediate relief so he can return to his office layout. Which remedy is filtered OUT by the Vijayakar Thermal-Thirst Mask?',
        options: [
          'Belladonna (HOT, THIRSTLESS)',
          'Pulsatilla (HOT, THIRSTLESS)',
          'Arsenicum Album (CHILLY, THIRSTY - Filtered Out)',
          'Apis Mellifica (HOT, THIRSTLESS)',
        ],
        correctIndex: 2,
        explanation:
          'Arsenicum Album is strictly Chilly and Thirsty. Prescribing a Chilly+Thirsty remedy to a Hot+Thirstless patient violates physical baseline thermodynamics and risks disease suppression.',
      },
      {
        id: 'q2',
        question:
          'According to Hering’s Law of Cure and Embryological Layering, which direction of symptom appearance indicates true biological healing?',
        options: [
          'From Ectoderm (Skin) inwards to Endoderm (Internal Organs)',
          'From Endoderm (Internal Organs) outwards to Ectoderm (Skin)',
          'From below upwards and from outside inwards',
          'Simultaneous eruption on all embryological layers',
        ],
        correctIndex: 1,
        explanation:
          'True Hahnemannian cure moves from within outwards, from more vital organs (Endoderm) to less vital organs (Ectoderm/Skin). Movement in reverse indicates suppression.',
      },
    ],
  },
  {
    id: 'course-02',
    code: 'MD-HOM-502',
    title: 'Dr. J.C. Burnett’s Organopathy, Tissue Drainage & Potency Safety Limits',
    instructor: 'Dr. Ananya Sengupta, MD (Hom.), NIH Kolkata',
    duration: '5 Hours • 5 Chapters',
    level: 'MD (HOM.) RESIDENT',
    chaptersCount: 5,
    progressPercent: 40,
    summary:
      'Learn when to apply low-potency organ-affine remedies (1X–6X) to drain pathological tissues in severe cirrhosis or renal degeneration before constitutional prescribing.',
    chapters: [
      { title: 'Chapter 1: The Limits of High-Potency Constitutional Prescribing in Organ Failure', duration: '60 mins', completed: true },
      { title: 'Chapter 2: Burnett’s Organopathy: Chelidonium, Carduus marianus & Solidago', duration: '60 mins', completed: true },
      { title: 'Chapter 3: Potency Ceilings: Why Potencies >30C are Restricted in Structural ICD-11 Cases', duration: '60 mins', completed: false },
      { title: 'Chapter 4: Synchronizing Drainage Track & Constitutional Track in MateriaGrid', duration: '60 mins', completed: false },
      { title: 'Chapter 5: Clinical OPD Follow-Up & Posology Adjustments', duration: '60 mins', completed: false },
    ],
    quiz: [
      {
        id: 'q3',
        question:
          'When a patient presents with chronic hepatobiliary cirrhosis (ICD-11 5A11), what does Dr. Burnett recommend as the immediate Primary Track?',
        options: [
          'Single dose of Sulphur 10M dry granules',
          'Low-potency organ-affine Tissue Drainage remedies (e.g. Chelidonium 1X-6X or Carduus marianus)',
          'Immediate surgical referral without homeopathic support',
          'High-potency Lachesis 1M every 2 hours',
        ],
        correctIndex: 1,
        explanation:
          'Dr. Burnett demonstrated that severely deteriorated organic tissue requires low-potency organ-affine drainage remedies (1X-6X) to open pathological pathways before constitutional high potencies are given.',
      },
    ],
  },
];

export const BhmsClinicalAcademyView: React.FC<
  BhmsClinicalAcademyViewProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<'COURSES' | 'QUIZ' | 'SIMULATION'>(
    'COURSES'
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    ACADEMIC_COURSES[0].id
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // PATIENT SIMULATION SANDBOX STATE
  const [simStep, setSimStep] = useState<1 | 2 | 3 | 4>(1);
  const [simThermal, setSimThermal] = useState<'HOT' | 'CHILLY'>('HOT');
  const [simThirst, setSimThirst] = useState<'THIRSTLESS' | 'THIRSTY'>('THIRSTLESS');
  const [simSelectedRubrics, setSimSelectedRubrics] = useState<string[]>([
    'MIND - BUSINESS - talks of',
    'ABDOMEN - CIRRHOSIS - liver',
  ]);
  const [simChosenPotency, setSimChosenPotency] = useState<string>('DRAINAGE_LOW');

  const activeCourse =
    ACADEMIC_COURSES.find((c) => c.id === selectedCourseId) ||
    ACADEMIC_COURSES[0];

  const handleSelectQuizOption = (questionId: string, index: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    activeCourse.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) correct++;
    });
    return Math.round((correct / activeCourse.quiz.length) * 100);
  };

  // Calculate patient treatment simulation grade (0-100)
  const calculateSimulationGrade = () => {
    let score = 0;
    // Step 1: Patient is Hot + Thirstless
    if (simThermal === 'HOT' && simThirst === 'THIRSTLESS') score += 35;
    // Step 2: Selected liver rubrics
    if (simSelectedRubrics.includes('ABDOMEN - CIRRHOSIS - liver')) score += 30;
    // Step 3: Organopathy drainage low potency chosen for cirrhosis
    if (simChosenPotency === 'DRAINAGE_LOW') score += 35;
    return score;
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-mono space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* COURSERA-STYLE ACADEMIC HEADER BANNER */}
      <div
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-6 shadow-md ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-emerald-600 to-teal-600 flex items-center justify-center text-white font-black shadow-lg">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black text-white">
                AYUSH / BHMS &amp; MD (HOM.) INTERACTIVE CLINICAL ACADEMY &amp; OPD SIMULATION
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-black text-[10px]">
                ACADEMIC MASTERY
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Coursera-Style Methodological Chapters • Interactive Clinical Case Quizzes • Virtual OPD Patient Simulation Sandbox
            </p>
          </div>
        </div>

        {/* TOP ACADEMIC MASTERY INDEX CARD */}
        <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-[#05070A] border border-slate-800">
          <Award className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] text-gray-400 font-black block uppercase">
              INTERN CLINICAL MASTERY INDEX
            </span>
            <span className="text-sm font-black text-emerald-400">
              92% Academic Honors (Dr. Nitin Aggarwal)
            </span>
          </div>
        </div>
      </div>

      {/* TOP ACADEMIC TABS: CURRICULUM MATRIX vs COURSES vs QUIZZES vs VIRTUAL OPD PATIENT SIMULATION */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('CURRICULUM_MATRIX' as any)}
          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center space-x-2 cursor-pointer ${
            (activeTab as any) === 'CURRICULUM_MATRIX'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-[#0B0F19] text-gray-400 hover:text-white border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>🎓 NCH BHMS (5.5 Yr) &amp; MD (3 Yr) Degree Curriculum Breakdown</span>
        </button>

        <button
          onClick={() => setActiveTab('COURSES')}
          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'COURSES'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-[#0B0F19] text-gray-400 hover:text-white border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>📖 Active Course Modules ({ACADEMIC_COURSES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('QUIZ')}
          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'QUIZ'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-[#0B0F19] text-gray-400 hover:text-white border border-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>❓ Interactive Clinical Case Quizzes</span>
        </button>

        <button
          onClick={() => setActiveTab('SIMULATION')}
          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'SIMULATION'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'bg-[#0B0F19] text-gray-400 hover:text-white border border-slate-800'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>🧪 Virtual OPD Patient Simulation Sandbox</span>
        </button>
      </div>

      {/* TAB 0: NCH DEGREE CURRICULUM BREAKDOWN TABLE (BHMS 1-4 YRS + INTERNSHIP + MD PART I-II) */}
      {(activeTab as any) === 'CURRICULUM_MATRIX' && (
        <div className="p-6 rounded-2xl border border-[#1C1F26] bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-emerald-600 text-white">
                NATIONAL COMMISSION FOR HOMEOPATHY (NCH) ACADEMIC FRAMEWORK
              </span>
              <h2 className="text-base font-black text-white mt-1">
                BHMS &amp; MD (HOM.) DEGREE STRUCTURE • CHAPTERS, QUIZZES, CLINICAL ASSIGNMENTS &amp; SIMULATION SCORING
              </h2>
            </div>

            <div className="text-right text-xs">
              <span className="text-emerald-400 font-black block">
                TOTAL STRUCTURED MODULES: 24 COURSES • 140 CHAPTERS • 68 QUIZZES • 36 OPD ASSIGNMENTS
              </span>
              <span className="text-gray-400 text-[11px]">
                All simulations evaluate Clinical Precision Grade (0-100) &amp; Hering’s Law adherence
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-emerald-400 font-black uppercase text-[10px]">
                  <th className="py-3 px-4">Degree &amp; Academic Year</th>
                  <th className="py-3 px-4">Core Clinical Subjects</th>
                  <th className="py-3 px-4">Chapters</th>
                  <th className="py-3 px-4">Interactive Quizzes</th>
                  <th className="py-3 px-4">Clinical OPD Assignments</th>
                  <th className="py-3 px-4">Patient Simulation Challenge</th>
                  <th className="py-3 px-4">Scoring &amp; Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 font-black text-amber-300">
                    BHMS 1st Professional Year
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Organon of Medicine (§1-70), Materia Medica Foundations, Anatomy &amp; Physiology
                  </td>
                  <td className="py-3.5 px-4 font-mono">18 Chapters</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">8 Quizzes</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">4 Proving Logbooks</td>
                  <td className="py-3.5 px-4 font-bold text-gray-300">Acute Case History Taking</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-black">75% Passing Threshold</td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 font-black text-amber-300">
                    BHMS 2nd Professional Year
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Organon (§71-145 Chronic Diseases), Polycrest Materia Medica, Pathology &amp; Forensic
                  </td>
                  <td className="py-3.5 px-4 font-mono">22 Chapters</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">10 Quizzes</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">5 Miasm Analysis Reports</td>
                  <td className="py-3.5 px-4 font-bold text-gray-300">Chronic Physical Baseline Setup</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-black">80% Passing Threshold</td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 font-black text-amber-300">
                    BHMS 3rd Professional Year
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Classical Repertories (Kent, Bönninghausen, BBCR), Surgery &amp; Gynae Homoeotherapeutics
                  </td>
                  <td className="py-3.5 px-4 font-mono">24 Chapters</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">12 Quizzes</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">6 Manual Repertorization Sheets</td>
                  <td className="py-3.5 px-4 font-bold text-gray-300">Kentian §153 Evaluation Challenge</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-black">80% Passing Threshold</td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 font-black text-amber-300">
                    BHMS 4th Professional Year
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Practice of Medicine, Digital Repertorization, Sehgal ROH &amp; Vijayakar Therapeutics
                  </td>
                  <td className="py-3.5 px-4 font-mono">28 Chapters</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">14 Quizzes</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">8 Live OPD Case Summaries</td>
                  <td className="py-3.5 px-4 font-bold text-gray-300">Asymmetrical Specificity Matrix</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-black">85% Passing Threshold</td>
                </tr>

                <tr className="bg-emerald-950/20 hover:bg-emerald-950/30">
                  <td className="py-3.5 px-4 font-black text-emerald-400">
                    BHMS Compulsory Internship (1 Year)
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Live Clinical OPD &amp; IPD Rotations, Telehealth OPD, Burnet Tissue Drainage Override
                  </td>
                  <td className="py-3.5 px-4 font-mono">16 Clinical Tutorials</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">10 Case Defense Exams</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">50 Verified OPD Case Logbook</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-300">Virtual OPD Patient Simulator Sandbox</td>
                  <td className="py-3.5 px-4 text-amber-400 font-black">Clinical OPD License Certificate</td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 font-black text-purple-300">
                    MD (Hom.) Part-I Residency
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Advanced Homeopathic Philosophy, Biostatistics &amp; CCRH Clinical Research Methodology
                  </td>
                  <td className="py-3.5 px-4 font-mono">16 Research Chapters</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">6 Advanced Exams</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">Dissertation Protocol Submission</td>
                  <td className="py-3.5 px-4 font-bold text-gray-300">Double-Blind Clinical Trial Simulation</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-black">MD Part-I Credential</td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 font-black text-purple-300">
                    MD (Hom.) Part-II Specialization
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Specializations: Repertory / Materia Medica / Organon / Practice of Medicine
                  </td>
                  <td className="py-3.5 px-4 font-mono">16 Specialist Chapters</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">8 Grand Viva Quizzes</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">Clinical Thesis &amp; Specialty Logbook</td>
                  <td className="py-3.5 px-4 font-bold text-gray-300">Severe Pathology Drainage Gate Defense</td>
                  <td className="py-3.5 px-4 text-amber-400 font-black">MD (Hom.) Specialist Fellowship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 1: COURSERA-STYLE COURSES & CHAPTERS */}
      {activeTab === 'COURSES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* COURSE LIST (4 COLS) */}
          <div className="lg:col-span-4 space-y-3">
            {ACADEMIC_COURSES.map((course) => {
              const isSelected = course.id === activeCourse.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-950/60 to-emerald-950/40 border-amber-500 shadow-lg'
                      : 'bg-[#0B0F19] border-[#1C1F26] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded font-black bg-amber-500/20 text-amber-300">
                      {course.code} • {course.level}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-black text-xs text-white leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-[11px] text-gray-400 line-clamp-2">
                    {course.summary}
                  </p>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                      <span>Course Progress</span>
                      <span className="text-emerald-400">{course.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE COURSE CHAPTERS & CONTENT READER (8 COLS) */}
          <div className="lg:col-span-8 p-6 rounded-2xl border border-[#1C1F26] bg-[#0B0F19] space-y-6">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs px-2.5 py-1 rounded bg-amber-500 text-black font-black">
                {activeCourse.code} • OFFICIAL BHMS/MD CURRICULUM
              </span>
              <h2 className="text-lg font-black text-white">{activeCourse.title}</h2>
              <p className="text-xs text-gray-400">
                Instructor: <strong className="text-emerald-400">{activeCourse.instructor}</strong>
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-black text-xs text-white uppercase block">
                CHAPTER SYLLABUS &amp; VIDEO LESSONS ({activeCourse.chapters.length} CHAPTERS)
              </span>

              <div className="space-y-2">
                {activeCourse.chapters.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#05070A] border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      {ch.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Play className="w-5 h-5 text-amber-400" />
                      )}
                      <div>
                        <p className="font-black text-xs text-white">
                          {ch.title}
                        </p>
                        <span className="text-[10px] text-gray-500">
                          Lesson Duration: {ch.duration}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('QUIZ')}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer"
                    >
                      {ch.completed ? 'Review Chapter' : 'Start Lesson ▶'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE CLINICAL CASE QUIZZES & INSTANT SCORING */}
      {activeTab === 'QUIZ' && (
        <div className="p-6 rounded-2xl border border-[#1C1F26] bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black text-purple-400 uppercase">
                CLINICAL REASONING QUIZ FOR: {activeCourse.code}
              </span>
              <h2 className="text-base font-black text-white">
                {activeCourse.title}
              </h2>
            </div>

            {quizSubmitted && (
              <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center space-x-2 shadow-lg">
                <Award className="w-5 h-5" />
                <span>
                  YOUR QUIZ SCORE: {calculateQuizScore()}% ({calculateQuizScore() >= 80 ? 'PASS WITH MASTERY' : 'REVIEW NEEDED'})
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {activeCourse.quiz.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-[#05070A] border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="font-black text-xs text-white leading-relaxed">
                    Q{qIdx + 1}: {q.question}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnClass =
                      'bg-[#111317] border-slate-800 text-gray-300 hover:border-slate-700';
                    if (isSelected && !quizSubmitted) {
                      btnClass = 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold';
                    } else if (quizSubmitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-red-600/20 border-red-500 text-red-300 font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${btnClass}`}
                      >
                        <span className="font-black mr-2">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs space-y-1">
                    <span className="font-black text-purple-300 block">
                      💡 CLINICAL EXPLANATION &amp; LITERATURE REASONING:
                    </span>
                    <p className="text-gray-300">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 font-black text-xs hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 inline mr-1" /> Reset Quiz Answers
            </button>

            <button
              onClick={() => setQuizSubmitted(true)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md cursor-pointer"
            >
              Submit Quiz &amp; Generate Evaluation Score
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: VIRTUAL OPD PATIENT TREATMENT SIMULATION SANDBOX */}
      {activeTab === 'SIMULATION' && (
        <div className="p-6 rounded-2xl border border-emerald-500/40 bg-[#0B0F19] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded font-black bg-emerald-600 text-white">
                VIRTUAL CLINICAL OPD SIMULATOR v2.4
              </span>
              <h2 className="text-base font-black text-white mt-1">
                PATIENT CASE SIMULATION: Sneha Patil (29F) • Chronic Hepatobiliary Jaundice &amp; Stress
              </h2>
            </div>

            <div className="px-4 py-2 rounded-xl bg-[#05070A] border border-emerald-500 text-right">
              <span className="text-[10px] text-gray-400 font-black block">
                SIMULATION PRECISION GRADE
              </span>
              <span className="text-lg font-black text-emerald-400">
                {calculateSimulationGrade()} / 100 POINTS
              </span>
            </div>
          </div>

          {/* SIMULATION STEP 1: PATIENT NARRATIVE & PHYSICAL CONSTANTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#05070A] border border-slate-800 space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase">
                1. Virtual Patient Narrative
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                &ldquo;Doctor, I have severe chronic dull aching pain under my right shoulder blade and yellow sclera. Please just give me something fast so I can get back to my business layout! I hate sitting idle.&rdquo;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#05070A] border border-slate-800 space-y-3">
              <span className="text-xs font-black text-cyan-400 uppercase">
                2. Set Vijayakar Physical Baselines
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSimThermal('HOT')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThermal === 'HOT' ? 'bg-orange-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  🔥 HOT (Covering off)
                </button>
                <button
                  onClick={() => setSimThermal('CHILLY')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThermal === 'CHILLY' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  ❄️ CHILLY
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSimThirst('THIRSTLESS')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThirst === 'THIRSTLESS' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  💧 THIRSTLESS
                </button>
                <button
                  onClick={() => setSimThirst('THIRSTY')}
                  className={`flex-1 py-2 rounded-lg font-black text-xs cursor-pointer ${
                    simThirst === 'THIRSTY' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  🚰 THIRSTY
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#05070A] border border-slate-800 space-y-3">
              <span className="text-xs font-black text-amber-400 uppercase">
                3. Burnett Posology Safety Choice
              </span>
              <p className="text-[11px] text-gray-400">
                Diagnostic Tag: ICD-11 5A11 CIRRHOSIS / CHRONIC HEPATITIS
              </p>
              <button
                onClick={() => setSimChosenPotency('DRAINAGE_LOW')}
                className={`w-full py-2 rounded-lg font-black text-xs cursor-pointer ${
                  simChosenPotency === 'DRAINAGE_LOW'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-gray-400'
                }`}
              >
                Chelidonium majus 1X-6X Liquid Tissue Drainage
              </button>
              <button
                onClick={() => setSimChosenPotency('HIGH_CONSTITUTIONAL')}
                className={`w-full py-2 rounded-lg font-black text-xs cursor-pointer ${
                  simChosenPotency === 'HIGH_CONSTITUTIONAL'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-gray-400'
                }`}
              >
                Sulphur 10M Single High-Potency Dose
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BhmsClinicalAcademyView;
