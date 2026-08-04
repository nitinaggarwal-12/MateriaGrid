'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Search, ChevronDown, Check } from 'lucide-react';
import {
  INDIAN_LANGUAGE_PACKS,
  IndianLanguageCode,
} from '@/lib/i18n/indian_language_packs';

interface SearchableLanguagePickerProps {
  selectedCode: IndianLanguageCode;
  onSelectLanguage: (code: IndianLanguageCode) => void;
  theme?: 'dark' | 'light';
  variant?: 'compact' | 'landing';
}

export const SearchableLanguagePicker: React.FC<
  SearchableLanguagePickerProps
> = ({
  selectedCode,
  onSelectLanguage,
  theme = 'dark',
  variant = 'compact',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';

  const selectedPack =
    INDIAN_LANGUAGE_PACKS[selectedCode] || INDIAN_LANGUAGE_PACKS.EN;

  const allLanguages = Object.values(INDIAN_LANGUAGE_PACKS);

  const filteredLanguages = allLanguages.filter(
    (lang) =>
      lang.nativeName.toLowerCase().includes(query.toLowerCase()) ||
      lang.englishName.toLowerCase().includes(query.toLowerCase()) ||
      lang.code.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          setQuery('');
        }}
        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-black text-xs transition-all transform hover:scale-105 cursor-pointer ${
          variant === 'landing'
            ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md'
            : isLight
            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
            : 'bg-[#111317] hover:bg-slate-800 border-slate-800 text-white'
        }`}
        title="Click to search across all 35 Indian & Classical Homeopathic languages"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
        <span>
          {selectedPack.nativeName} ({selectedPack.code})
        </span>
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {/* SEARCHABLE DROPDOWN POPOVER */}
      {isOpen && (
        <div
          className={`absolute right-0 top-11 z-50 w-80 max-h-96 rounded-2xl border shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0B0F19] border-[#1C1F26] text-white'
          }`}
        >
          {/* SEARCH INPUT BAR */}
          <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#05070A]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search 35 languages (e.g. Hindi, German, Tamil, Marwari)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs font-bold border outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                    : 'bg-[#111317] border-slate-800 text-white focus:border-emerald-500'
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 px-1 font-bold">
              <span>ALL 22 INDIAN 8TH SCHEDULE + GLOBAL CLASSICAL</span>
              <span>{filteredLanguages.length} matches</span>
            </div>
          </div>

          {/* SCROLLABLE LIST OF LANGUAGES */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {filteredLanguages.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">
                No matching language found for "{query}".
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === selectedCode;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-black'
                        : isLight
                        ? 'hover:bg-slate-100 text-slate-800 font-bold'
                        : 'hover:bg-slate-800 text-gray-200 font-bold'
                    }`}
                  >
                    <div>
                      <span className="text-sm">{lang.nativeName}</span>
                      <span
                        className={`ml-2 text-xs ${
                          isSelected
                            ? 'text-emerald-100'
                            : isLight
                            ? 'text-slate-500'
                            : 'text-gray-400'
                        }`}
                      >
                        — {lang.englishName}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-gray-400'
                        }`}
                      >
                        {lang.code}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableLanguagePicker;
