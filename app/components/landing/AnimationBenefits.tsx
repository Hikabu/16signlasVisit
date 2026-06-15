import React, { useState, useEffect, useRef } from 'react';
/**
 * As the user scrolls, the left side (the headline and CTA) remains fixed 
 * in place, while the right side scrolls vertically. 
 * Simultaneously, an interactive top navigation bar
 * highlights the active category based on the current scroll position.

 */

// Configuration data matching the video text exactly
const SECTIONS = [
  {
    id: 'ai-noise',
    label: 'AI Noise',
    today:
      'A candidate shows polished GitHub repos, perfect READMEs, and impressive commits. After a 90-minute interview, you discover they cannot explain or debug their own code. The portfolio was assembled with AI, not built.',
    withHumble:
      '16 Signals detects commit inflation, AI-generated portfolios, and writing-style inconsistencies before the first interview. Your team only spends time on candidates who actually built what they claim.'
  },

  {
    id: 'screening',
    label: 'Screening',
    today:
      'You post one role and receive 200 applications. Engineers waste entire evenings scanning CVs, checking GitHub links, and guessing who is real. Strong candidates drown in keyword noise.',
    withHumble:
      '16 Signals processes every applicant automatically and generates ranked Evidence Briefs in minutes. Candidates are scored by authentic proof of work, not keyword matching.'
  },

  {
    id: 'interviews',
    label: 'Interviews',
    today:
      'First technical interviews are blind and expensive. Senior engineers spend 90 minutes fishing for signal only to realize the candidate memorized interview patterns instead of understanding real systems.',
    withHumble:
      '16 Signals prepares interview intelligence before the call. Red flags, skill gaps, and exact probe questions are surfaced automatically so interviews become targeted verification, not guesswork.'
  },

  {
    id: 'verification',
    label: 'Verification',
    today:
      'Candidates claim years at major protocols or companies, but verification only happens after multiple interviews. By the time inconsistencies appear, your team already lost hours.',
    withHumble:
      '16 Signals runs multi-layer employment and contribution verification automatically. Claims are validated against public records, repositories, and contribution timelines before the first conversation.'
  },

  {
    id: 'seniority',
    label: 'Seniority',
    today:
      '“Senior” titles no longer mean senior ability. Interview preparation hides weak ownership and shallow system thinking until months after hiring.',
    withHumble:
      '16 Signals evaluates real engineering maturity, growth trajectory, collaboration impact, and operational ownership. You hire for demonstrated capability, not self-reported titles.'
  },

  {
    id: 'ai-leverage',
    label: 'AI Usage',
    today:
      'Two engineers both use AI tools daily. One ships faster with better output. The other generates code they do not understand. Traditional hiring cannot tell the difference.',
    withHumble:
      '16 Signals measures AI leverage quality directly by analyzing workflow patterns, commit quality, and engineering output. You see who uses AI as acceleration versus camouflage.'
  }
];
export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('mes');
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300; // Offset for trigger point

      for (const section of SECTIONS) {
        const el = sectionRefs.current[section.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#FAF9F5] text-[#1E1E1E] font-sans antialiased relative min-h-screen">
      
      {/* Dynamic Animated Top Tracker Nav */}
      <div className="sticky top-0 z-50 bg-[#FAF9F5]/80 backdrop-blur-md border-b border-gray-200/50 py-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-8 flex justify-end items-center gap-6 text-xs font-semibold tracking-wider text-gray-400">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <span 
                key={sec.id} 
                className={`transition-all duration-300 transform ${
                  isActive ? 'text-[#1E1E1E] scale-110 border-b-2 border-black pb-1' : 'opacity-60'
                }`}
              >
                {sec.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Main Splitscreen Layout */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        
        {/* Left Column: Sticky Control Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit self-start space-y-6">
          <h1 className="text-3xl lg:text-4xl font-normal leading-tight tracking-tight max-w-sm">
            Conventional ERPs/MES/etc force you to ignore <br />
            <span className="font-semibold">the 5% edge cases—or patch with spreadsheets.</span>
          </h1>
          <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
            But Your Edge Cases are YOUR BUSINESS. <br />
            <span className="text-[#D35A4A] font-medium">Humble makes them standard work.</span>
          </p>
          <button className="bg-black text-white font-medium text-sm px-6 py-3 rounded-md hover:bg-gray-900 transition-all shadow-sm">
            Start my 24h Build
          </button>
        </div>

        {/* Right Column: Cards Interconnected by an SVG Constellation */}
        <div className="lg:col-span-7 relative pl-12 space-y-24">
          
          {/* Background Structural SVG Line Network */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E5E7EB" />
                <stop offset="50%" stopColor="#D1D5DB" />
                <stop offset="100%" stopColor="#9CA3AF" />
              </linearGradient>
            </defs>
            {/* Central Spine line connecting the nodes */}
            <path 
              d="M 16 40 L 16 2300" 
              fill="none" 
              stroke="url(#line-grad)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />
          </svg>

          {SECTIONS.map((sec) => (
            <div 
              key={sec.id}
              ref={(el) => (sectionRefs.current[sec.id] = el)}
              className="relative z-10 scroll-mt-40"
            >
              {/* Floating Section Node */}
              <div className="absolute -left-16 top-2 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-white ${
                  activeSection === sec.id ? 'border-black scale-110 shadow-md' : 'border-gray-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${activeSection === sec.id ? 'bg-black' : 'bg-gray-300'}`} />
                </div>
                <span className={`text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors ${
                  activeSection === sec.id ? 'text-black' : ''
                }`}>
                  {sec.label}
                </span>
              </div>

              {/* Stacked Content Cards */}
              <div className={`bg-white rounded-2xl p-8 border transition-all duration-500 max-w-xl ${
                activeSection === sec.id ? 'border-gray-300 shadow-xl y-translate-0' : 'border-gray-100 shadow-sm opacity-60 scale-[0.99]'
              }`}>
                {/* Today State */}
                <div className="space-y-3 pb-6 border-b border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Today</h4>
                  <p className="text-gray-600 text-[14px] leading-relaxed">{sec.today}</p>
                </div>

                {/* With Humble State */}
                <div className="space-y-3 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D35A4A]">With Humble</h4>
                  <p className="text-gray-900 text-[14px] font-medium leading-relaxed">{sec.withHumble}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Matrix Comparison Table Section --- */}
      <div className="bg-[#FAF9F5] border-t border-gray-200/60 pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-8 text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D35A4A]">Humble Platform</span>
          <h2 className="text-3xl font-semibold mt-2 tracking-tight">Why Humble Is Safer — <br />and Beats the Alternatives</h2>
          <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
            Waterfall implementations ask you to wait 5–9 months for first value. Humble ships custom working software on Day 3, then new versions every day you can test on the floor. Smaller, iterative, bets. Faster feedback. Faster Time to Value. Lower risk.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-8 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="py-4 w-1/4"></th>
                <th className="py-4 px-4 bg-[#F4F3EE] rounded-t-xl text-[#D35A4A] w-1/4 text-center">Humble Platform</th>
                <th className="py-4 px-4 w-1/6 text-center">Big Box MES/ERP/etc</th>
                <th className="py-4 px-4 w-1/6 text-center">DIY Low-Code</th>
                <th className="py-4 px-4 w-1/6 text-center">Status Quo (Do Nothing)</th>
              </tr>
            </thead>
            <tbody className="text-[13px] divide-y divide-gray-100">
              {COMPARISON_TABLE.headers.map((header, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-semibold text-gray-800 pr-4">{header}</td>
                  
                  {/* Humble Core Value Column */}
                  <td className="py-4 px-4 bg-[#F4F3EE] font-medium text-gray-900 text-center border-x border-gray-200/50">
                    <span className="block text-[#D35A4A] font-bold">{COMPARISON_TABLE.humble[idx].title}</span>
                    {COMPARISON_TABLE.humble[idx].desc}
                  </td>

                  {/* Competitor Columns */}
                  <td className="py-4 px-4 text-gray-500 text-center whitespace-pre-line">{COMPARISON_TABLE.bigBox[idx]}</td>
                  <td className="py-4 px-4 text-gray-500 text-center whitespace-pre-line">{COMPARISON_TABLE.diy[idx]}</td>
                  <td className="py-4 px-4 text-gray-500 text-center whitespace-pre-line">{COMPARISON_TABLE.statusQuo[idx]}</td>
                </tr>
              ))}
              {/* Small bottom radius cleanup for the highlight column */}
              <tr>
                <td></td>
                <td className="bg-[#F4F3EE] h-2 rounded-b-xl border-x border-b border-gray-200/20"></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}