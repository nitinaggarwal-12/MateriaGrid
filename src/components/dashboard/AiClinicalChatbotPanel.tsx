'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  PlusCircle,
  Zap,
  Send,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'DOCTOR' | 'GEMINI_AI';
  text: string;
  timestamp: string;
  suggestedRubrics?: string[];
}

interface AiClinicalChatbotPanelProps {
  onCommitRubricToMatrix?: (rubricPath: string) => void;
  theme?: 'dark' | 'light';
}

export const AiClinicalChatbotPanel: React.FC<
  AiClinicalChatbotPanelProps
> = ({ onCommitRubricToMatrix, theme = 'light' }) => {
  const isLight = theme === 'light';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'GEMINI_AI',
      text: 'MateriaGrid Gemini 2.5 Pro Clinical Assistant initialized. Active Doctor Clone: Dr. Prafull Vijayakar (Predictive Model). Ask for differential diagnostics, thermal-thirst baseline contradictions, or paste patient transcript notes.',
      timestamp: '18:10:02',
    },
    {
      id: 'msg-2',
      sender: 'DOCTOR',
      text: 'Patient presents with severe pulsating right-sided headache after sunlight exposure, talks constantly about business, thermal HOT, thirstless. Should I prescribe Belladonna or Bryonia?',
      timestamp: '18:10:45',
    },
    {
      id: 'msg-3',
      sender: 'GEMINI_AI',
      text: 'Based on Dr. Vijayakar Predictive Thermal-Thirst & Sehgal ROH rules:\n\n1. Belladonna (Score 65.2): Matches the sudden throbbing headache, right-sided presentation, sun aggravation, and the present mental state "MIND - BUSINESS - talks of" (Grade 3). Thermal HOT and Thirstless match Belladonna acute presentation.\n2. Bryonia alba (Score 46.8): Also covers "talks of business" (Grade 4) and thirstless/infrequent thirst, but Bryonia pain is stitching and aggravated by slightest motion rather than sudden congestion.\n\nRECOMMENDATION: Belladonna 200C in liquid sip doses.',
      timestamp: '18:10:48',
      suggestedRubrics: [
        'MIND - BUSINESS - talks of',
        'HEAD - PAIN - pulsating - sudden',
        'HEAD - PAIN - sun - exposure to',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const promptChips = [
    'Check Thermal Elimination Contradictions',
    'Suggest Burnett Liver Organopathy Drainage',
    'Differentiate Belladonna vs Bryonia in Sunstroke',
    'Evaluate Sehgal ROH Present Mental State',
  ];

  const handleSendPrompt = (promptText?: string) => {
    const query = promptText || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'DOCTOR',
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptText) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'GEMINI_AI',
        text: `Analysis complete for query: "${query}".\n\nCross-referenced with 150,000 repertory rubrics and Boericke proving text. The patient's physical baseline confirms thermal-thirst stability. No miasmatic suppression risk detected.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        suggestedRubrics: ['GENERALITIES - SLEEP - position - knee-chest position'],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#090A0C] text-[#E6E8EA]'
      }`}
    >
      {/* CHAT HEADER */}
      <div
        className={`p-3 border-b flex items-center justify-between ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider">
              Gemini 2.5 Pro Clinical Decision Copilot
            </h2>
            <p className="text-[10px] text-gray-500 font-mono">
              Homeopathic Differential Consultation Engine & NLP Parser
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
            MODEL: GEMINI-2.5-PRO
          </span>
        </div>
      </div>

      {/* OPD QUICK-PROMPT CHIPS BAR */}
      <div
        className={`px-3 py-2 border-b flex flex-wrap items-center gap-2 ${
          isLight
            ? 'bg-slate-100 border-slate-200'
            : 'bg-[#090A0C] border-[#1C1F26]'
        }`}
      >
        <Zap className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-[10px] font-bold uppercase font-mono text-gray-500">
          OPD Quick Queries:
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(chip)}
            className={`border px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
                : 'bg-[#111317] border-[#1C1F26] text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* MESSAGES FEED */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start space-x-2.5 ${
              m.sender === 'DOCTOR' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.sender === 'GEMINI_AI' && (
              <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-lg p-3 text-xs space-y-2 border shadow-xs ${
                m.sender === 'DOCTOR'
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-[#111317] border-[#1C1F26] text-gray-200'
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[10px] font-mono opacity-80">
                <span className="font-bold uppercase">
                  {m.sender === 'DOCTOR' ? 'Dr. In-Charge OPD' : 'MateriaGrid Clinical AI'}
                </span>
                <span>{m.timestamp}</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed text-xs">
                {m.text}
              </p>

              {m.suggestedRubrics && m.suggestedRubrics.length > 0 && (
                <div
                  className={`mt-2 pt-2 border-t space-y-1.5 ${
                    isLight ? 'border-slate-200' : 'border-[#1C1F26]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Suggested Repertory Rubrics to Commit:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.suggestedRubrics.map((r, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          onCommitRubricToMatrix && onCommitRubricToMatrix(r)
                        }
                        className={`border px-2 py-1 rounded font-mono text-[10px] flex items-center space-x-1 cursor-pointer transition-colors ${
                          isLight
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                            : 'bg-[#090A0C] border-[#10B981]/40 text-emerald-300 hover:bg-emerald-900/60'
                        }`}
                        title="Click to commit this rubric into your SimiliMatrix table"
                      >
                        <PlusCircle className="w-3 h-3 text-emerald-600" />
                        <span>{r}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {m.sender === 'DOCTOR' && (
              <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center space-x-2 text-emerald-600 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Gemini 2.5 Pro evaluating repertory matrices & clinical provings...</span>
          </div>
        )}
      </div>

      {/* INPUT BAR */}
      <div
        className={`p-3 border-t flex items-center space-x-2 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111317] border-[#1C1F26]'
        }`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
          placeholder="Ask clinical differential questions or paste patient transcript notes..."
          className={`flex-1 border rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 font-mono ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              : 'bg-[#090A0C] border-[#1C1F26] text-white placeholder-gray-500'
          }`}
        />
        <button
          onClick={() => handleSendPrompt()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Consult AI</span>
        </button>
      </div>
    </div>
  );
};

export default AiClinicalChatbotPanel;
