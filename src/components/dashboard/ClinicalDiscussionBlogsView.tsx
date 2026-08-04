'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  BookOpen,
  ThumbsUp,
  Share2,
  Bookmark,
  Sparkles,
  Search,
  Tag,
  User,
  Clock,
  PlusCircle,
  CheckCircle2,
  TrendingUp,
  Award,
} from 'lucide-react';

interface ClinicalDiscussionBlogsViewProps {
  theme?: 'dark' | 'light';
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  category: 'SEHGAL_ROH' | 'BURNETT_DRAINAGE' | 'VIJAYAKAR_MIASM' | 'CLASSICAL_PROVING' | 'OPD_CASE_STUDY';
  summary: string;
  content: string;
  rubricsDiscussed: string[];
  remediesDiscussed: string[];
  upvotes: number;
  commentsCount: number;
  comments: { author: string; role: string; text: string; time: string }[];
}

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'Dr. Sehgal ROH in Acute Business Anxiety: Differentiating Belladonna vs Nux Vomica vs Sulphur',
    author: 'Dr. Nitin Aggarwal, MD (Hom.)',
    authorRole: 'Senior Classical Homeopath & MateriaGrid Lead Investigator',
    date: 'August 3, 2026',
    category: 'SEHGAL_ROH',
    summary:
      'How conversational present, predominating, and persisting (PPP) mind expressions like "Doctor, just give me something fast so I can get back to my business layout" map directly to high-weight rubrics.',
    content:
      'In modern clinical outpatient practice (OPD), patients rarely speak in archaic 19th-century Kentian terms. Under Dr. M.L. Sehgal’s Revolutionized Homeopathy (ROH), we translate real-time speech into immutable mental rubrics. When a modern entrepreneur presents with sudden throbbing migraine during high-stress corporate expansion, their persistent demand for immediate action maps to MIND - BUSINESS - talks of combined with MIND - IMPATIENCE - business in.',
    rubricsDiscussed: ['MIND - BUSINESS - talks of', 'MIND - ANXIETY - night', 'HEAD - PAIN - pulsating - sudden'],
    remediesDiscussed: ['Bell', 'Nux-v', 'Sulph', 'Acon'],
    upvotes: 48,
    commentsCount: 3,
    comments: [
      {
        author: 'Dr. Priya Sharma, BHMS',
        role: 'Consultant Homeopath, Mumbai',
        text: 'Wonderful breakdown! The TF-IDF Inverse Rubric Density scoring in MateriaGrid prevented Arsenicum from masking Belladonna here.',
        time: '2 hours ago',
      },
      {
        author: 'Prof. Rajeshwar Rao, MD (Hom.)',
        role: 'Head of Materia Medica, NIH Kolkata',
        text: 'Classical Hahnemannian purity combined with Sehgal ROH behavioral translation is the future of OPD.',
        time: '5 hours ago',
      },
    ],
  },
  {
    id: 'blog-02',
    title: 'Dr. Burnett Organopathy & Tissue Drainage in Chronic Hepatobiliary Cirrhosis',
    author: 'Dr. Ananya Sengupta, MD (Hom.)',
    authorRole: 'Hepatobiliary Homeopathic Specialist, Kolkata',
    date: 'August 1, 2026',
    category: 'BURNETT_DRAINAGE',
    summary:
      'Why high-potency constitutional remedies must be restricted behind a safety drainage mask when structural liver parenchyma deterioration is flagged under ICD-11 5A11.',
    content:
      'Dr. J.C. Burnett taught us that when an organ is deeply pathological or cirrhotic, prescribing high-potency constitutional remedies without prior tissue drainage can precipitate severe aggravation or cellular overload. In MateriaGrid, whenever diagnostic tags like CIRRHOSIS or RENAL_FAILURE are detected, the engine splits recommendations into Organopathic / Tissue Drainage Remedies (Chelidonium majus, Carduus marianus, Solidago) and imposes a safety ceiling warning (>30C/200C caution).',
    rubricsDiscussed: ['ABDOMEN - CIRRHOSIS - liver', 'ABDOMEN - PAIN - right scapula', 'ABDOMEN - JAUNDICE'],
    remediesDiscussed: ['Chel', 'Card-m', 'Solid', 'Tarax'],
    upvotes: 62,
    commentsCount: 2,
    comments: [
      {
        author: 'Dr. Vikramaditya Sen',
        role: 'Clinical Pathologist & AYUSH Researcher',
        text: 'The automated dual-track recommendation engine protects fragile patients while preserving constitutional depth.',
        time: '1 day ago',
      },
    ],
  },
  {
    id: 'blog-03',
    title: 'Dr. Prafull Vijayakar Predictive Thermal-Thirst Mask: Preventing Genetic Suppression',
    author: 'Dr. Meera Krishnan, BHMS',
    authorRole: 'Predictive Homeopathy Practitioner, Chennai',
    date: 'July 28, 2026',
    category: 'VIJAYAKAR_MIASM',
    summary:
      'Hard physical constants—Thermal (Hot/Chilly/Ambithermal) and Thirst (Thirsty/Thirstless)—act as an absolute mathematical mask against superficial matching.',
    content:
      'According to Dr. Vijayakar’s Predictive Homeopathy laws, prescribing a strictly Chilly + Thirsty remedy to a Hot + Thirstless patient violates physical baseline thermodynamics and risks disease suppression from Ectoderm to Endoderm. MateriaGrid automatically filters out incompatible remedies in real time.',
    rubricsDiscussed: ['STOMACH - THIRSTLESS - fever during', 'GENERALITIES - HEAT - flushes of'],
    remediesDiscussed: ['Puls', 'Apis', 'Lach'],
    upvotes: 39,
    commentsCount: 1,
    comments: [
      {
        author: 'Dr. K. S. Nair',
        role: 'Government AYUSH Medical Officer',
        text: 'Essential read for all BHMS interns starting their OPD postings.',
        time: '3 days ago',
      },
    ],
  },
];

export const ClinicalDiscussionBlogsView: React.FC<
  ClinicalDiscussionBlogsViewProps
> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [selectedBlogId, setSelectedBlogId] = useState<string>(INITIAL_BLOGS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [newCommentText, setNewCommentText] = useState('');
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  // New Blog form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BlogPost['category']>('SEHGAL_ROH');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory =
      selectedCategory === 'ALL' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeBlog = blogs.find((b) => b.id === selectedBlogId) || blogs[0];

  const handleUpvote = (id: string) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, upvotes: b.upvotes + 1 } : b))
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeBlog) return;

    const newComment = {
      author: 'Dr. Nitin Aggarwal, MD (Hom.)',
      role: 'Attending Practitioner',
      text: newCommentText,
      time: 'Just now',
    };

    setBlogs((prev) =>
      prev.map((b) =>
        b.id === activeBlog.id
          ? {
              ...b,
              commentsCount: b.commentsCount + 1,
              comments: [...b.comments, newComment],
            }
          : b
      )
    );
    setNewCommentText('');
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newTitle,
      author: 'Dr. Nitin Aggarwal, MD (Hom.)',
      authorRole: 'Clinical Case Contributor',
      date: 'Today',
      category: newCategory,
      summary: newSummary || newContent.substring(0, 140) + '...',
      content: newContent,
      rubricsDiscussed: ['MIND - CLINICAL - observation'],
      remediesDiscussed: ['Bell', 'Sulph'],
      upvotes: 1,
      commentsCount: 0,
      comments: [],
    };

    setBlogs((prev) => [created, ...prev]);
    setSelectedBlogId(created.id);
    setShowNewBlogForm(false);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto p-6 font-mono space-y-6 transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#05070A] text-white'
      }`}
    >
      {/* HEADER BANNER */}
      <div
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-6 shadow-md ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-emerald-600 to-teal-600 flex items-center justify-center text-white font-black shadow-lg">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                MATERIAGRID CLASSICAL CLINICAL DISCUSSION BLOGS & CASE EXCHANGE
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black">
                PEER REVIEWED
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
              Sehgal ROH Case Studies • Burnett Tissue Drainage Papers • Vijayakar Predictive Miasm Exchange • Peer Q&A
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNewBlogForm((prev) => !prev)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-black text-xs flex items-center space-x-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showNewBlogForm ? 'Close Article Editor' : '+ Publish Clinical Discussion / Case Study'}</span>
        </button>
      </div>

      {/* NEW BLOG PUBLISH FORM (COLLAPSIBLE) */}
      {showNewBlogForm && (
        <div className="p-6 rounded-2xl border border-purple-500/40 bg-[#0B0F19] space-y-4">
          <span className="font-black text-xs text-purple-400 uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> PUBLISH NEW HOMEOPATHIC DISCUSSION ARTICLE OR OPD CASE REPORT
          </span>
          <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 font-bold block mb-1">Article / Case Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sehgal ROH Translation in Pediatric Nocturnal Enuresis"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-gray-400 font-bold block mb-1">Methodological Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold outline-none"
                >
                  <option value="SEHGAL_ROH">Dr. Sehgal ROH Behavioral Translation</option>
                  <option value="BURNETT_DRAINAGE">Dr. Burnett Organopathy & Tissue Drainage</option>
                  <option value="VIJAYAKAR_MIASM">Dr. Vijayakar Predictive Miasm Mask</option>
                  <option value="CLASSICAL_PROVING">Classical Hahnemannian Proving Study</option>
                  <option value="OPD_CASE_STUDY">Outpatient OPD Case Study & Simillimum</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Executive Clinical Summary</label>
              <input
                type="text"
                placeholder="Brief 2-line summary of the key clinical lesson or rubric discovery..."
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Full Clinical Discussion Content</label>
              <textarea
                rows={5}
                required
                placeholder="Share your complete case observations, TF-IDF specificity notes, thermal-thirst baseline interactions, or literature discussion..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#111317] border border-slate-800 text-white font-bold outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer shadow-md"
              >
                🚀 Publish Article to Practitioner Network
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FILTER & CATEGORY TOOLBAR */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border ${
          isLight
            ? 'bg-white border-slate-200 shadow-2xs'
            : 'bg-[#0B0F19] border-[#1C1F26]'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: 'All Discussion Blogs' },
            { id: 'SEHGAL_ROH', label: '🧠 Sehgal ROH PPP' },
            { id: 'BURNETT_DRAINAGE', label: '🫁 Burnett Organopathy' },
            { id: 'VIJAYAKAR_MIASM', label: '🔥 Vijayakar Miasm' },
            { id: 'OPD_CASE_STUDY', label: '🏥 OPD Clinical Cases' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  : 'bg-[#111317] text-gray-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isLight ? 'text-slate-400' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search discussion blogs & rubrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-bold outline-none focus:border-purple-500 ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900'
                : 'bg-[#111317] border-slate-800 text-white'
            }`}
          />
        </div>
      </div>

      {/* TWO-COLUMN BLOGS & DETAILED DISCUSSION READER CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: LIST OF CLINICAL DISCUSSION BLOGS (5 COLS) */}
        <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
          {filteredBlogs.map((blog) => {
            const isSelected = blog.id === activeBlog.id;
            return (
              <div
                key={blog.id}
                onClick={() => setSelectedBlogId(blog.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? isLight
                      ? 'bg-purple-50 border-purple-500 shadow-xs'
                      : 'bg-gradient-to-r from-purple-950/60 to-emerald-950/40 border-purple-500 shadow-lg'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-purple-300 text-slate-900 shadow-2xs'
                    : 'bg-[#0B0F19] border-[#1C1F26] hover:border-slate-700 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isLight
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {blog.category.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                    <Clock className="w-3 h-3" /> {blog.date}
                  </span>
                </div>

                <h3 className={`font-black text-xs leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {blog.title}
                </h3>

                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                  {blog.summary}
                </p>

                <div className={`flex items-center justify-between pt-1 border-t text-[10px] ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <User className="w-3 h-3" /> {blog.author}
                  </span>
                  <div className={`flex items-center space-x-3 font-bold ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                    <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                      <ThumbsUp className="w-3 h-3" /> {blog.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> {blog.commentsCount} comments
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: ACTIVE BLOG POST & INTERACTIVE PEER DISCUSSIONS (7 COLS) */}
        {activeBlog && (
          <div
            className={`lg:col-span-7 p-6 rounded-2xl border space-y-6 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900 shadow-xs'
                : 'bg-[#0B0F19] border-[#1C1F26] text-white'
            }`}
          >
            {/* BLOG TITLE & META */}
            <div className={`space-y-3 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded-full font-black bg-purple-600 text-white">
                  {activeBlog.category.replace('_', ' ')}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{activeBlog.date}</span>
              </div>

              <h2 className={`text-lg font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {activeBlog.title}
              </h2>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-black text-white text-xs">
                    DR
                  </div>
                  <div>
                    <p className="font-black text-xs text-emerald-400">
                      {activeBlog.author}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {activeBlog.authorRole}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleUpvote(activeBlog.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-black flex items-center space-x-1.5 cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvote ({activeBlog.upvotes})</span>
                </button>
              </div>
            </div>

            {/* FULL ARTICLE BODY */}
            <div className="text-xs text-gray-200 leading-relaxed space-y-3">
              <p>{activeBlog.content}</p>
            </div>

            {/* HIGHLIGHTED RUBRICS & REMEDIES DISCUSSED */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#05070A] border border-slate-800">
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase block mb-1.5">
                  📌 Core Repertory Rubrics Highlighted
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeBlog.rubricsDiscussed.map((r, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black text-purple-400 uppercase block mb-1.5">
                  🧪 Remedies & Cross-Indications
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeBlog.remediesDiscussed.map((rem, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 font-black"
                    >
                      {rem}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* PEER DISCUSSION & COMMENTS SECTION */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <span className="font-black text-xs uppercase text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" /> CLINICAL PEER COMMENTS & METHODOLOGICAL Q&A ({activeBlog.comments.length})
              </span>

              <div className="space-y-2.5">
                {activeBlog.comments.map((comment, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#05070A] border border-slate-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-emerald-400">
                        {comment.author}{' '}
                        <span className="text-[10px] text-gray-400 font-normal">
                          ({comment.role})
                        </span>
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* POST NEW COMMENT FORM */}
              <form onSubmit={handleAddComment} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add your clinical insight, rubric refinement, or question..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-slate-800 text-white text-xs font-bold outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer shadow-md"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalDiscussionBlogsView;
