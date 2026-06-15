import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


/**
 * Design Aesthetic: Minimalist B2B SaaS landing page section. Warm, soft-gray container background (#f3f3f3 style) with high-contrast elements. Uses deep black titles, readable muted gray body text, and stark accent highlights (e.g., bright orange/coral buttons and alerts).
Layout Structure:
Header Navigation: A horizontal row of text-only tabs spaced equally. The active tab features a thin, bold accent underline.
Main Split-Content Container: A card with rounded corners, a subtle border, and a crisp white background. It splits into two columns:
Left Column (Copy): Houses a prominent section headline and two stacked, descriptive text blocks.
Right Column (Interactive Media/Preview): A container with a subtle background color where dynamic visual mockups (cards, timelines, charts) animate into view.
Animation & Transition Behavior:
Tab Navigation: Standard instant or ultra-fast transition between navigation states.
Content Panel Switch (Triggered by Tab Change):
When a tab is clicked, the entire inner content container (both left text and right visuals) performs a coordinated fade-out/fade-in sequence.
Phase 1: The active panel fades out completely over roughly 150ms.
Phase 2: The new panel fades in smoothly over 350ms, simultaneously translating slightly upward along the Y-axis (a subtle slide-up effect) to give a sense of physical layer positioning.
Phase 3 (Visual Asset Stagger): Inside the right column, individual graphic assets (like charts, inner cards, or controls) animate into place with a slight micro-delay after the container text appears, creating a polished, layered rendering effect.
Single-File React Component Implementation
This component implements the dynamic layout, tab state switching, text layouts, and mockup illustrations using Tailwind CSS for styles and Framer Motion for the exact fade-and-slide choreography.
 */
// --- DATA STRUCTURE FOR THE TABS AND CONTENT ---
const TAB_DATA = [
  {
    id: 'candidates',
    label: 'CANDIDATES',
    title: 'Your work speaks for itself. Now it can prove itself.',
    subtitle: 'Build your verified work record in minutes.',
    bullets: [
      {
        heading: 'One Profile. Tamper-Proof. Yours Forever.',
        body: 'Connect your work platforms — GitHub, Figma, Vercel, AWS — and we verify what you actually built, directly at the source. No self-reporting. No resume games. Cryptographic proof that travels with you, owned by you, forever. Not by recruiters. Not by platforms. Not even by us.'
      },
      {
        heading: 'Skip the Interview Theater.',
        body: 'Companies see your real contributions before the first call. 847 commits, 11 features shipped, 50K users impacted — verified. You stop explaining yourself. You start getting hired for what you actually built.'
      }
    ],
    visualType: 'candidate-profile'
  },
  {
    id: 'engineering-managers',
    label: 'ENGINEERING MANAGERS',
    title: 'See what they built before you spend an hour of your time.',
    subtitle: 'Time to confidence: 6 minutes. Not 6 weeks.',
    bullets: [
      {
        heading: 'Proof, Not Promises.',
        body: 'The resume says "led backend architecture." We show you 312 commits to a production repo, 8 production deploys, AWS IAM authorship confirmed. You know before the first interview whether this person can actually build for you — not after $80,000 and three months of pain.'
      },
      {
        heading: 'Filter by What Actually Matters.',
        body: 'Search verified candidates by real shipped work, active tech stack, contribution consistency, and users impacted — not by keywords candidates stuffed into a PDF. The signal is back. AI-generated resumes cannot fake a 3-year commit history.'
      }
    ],
    visualType: 'verified-profile'
  },
  {
    id: 'founders-ctos',
    label: 'FOUNDERS & CTOs',
    title: 'One bad hire can slow your entire company.',
    subtitle: 'Stop interviewing people who lied on their resume.',
    bullets: [
      {
        heading: 'The Dream vs. The Reality.',
        body: 'You post the role. HR brings candidates. You interview 3-4 people in 2 weeks. You hire the right one. Reality: 2,000 AI-polished applications, AI screener scoring AI resumes, six rounds of interviews, and you still don\'t know who you hired until month three.'
      },
      {
        heading: 'Verified Talent Pool. Immediate ROI.',
        body: 'Access developers whose entire work history is cryptographically verified across GitHub, Vercel, AWS, Figma, and 20+ platforms. Know actual output — commits to production, features shipped, users impacted — before a single interview. Start with one verified hire. The cost pays for itself on the first bad hire you avoid.'
      }
    ],
    visualType: 'comparison'
  },
  {
    id: 'hr-talent',
    label: 'HR & TALENT TEAMS',
    title: 'Stop the AI arms race. Get verified signal.',
    subtitle: 'Every current solution fails for the same reason.',
    bullets: [
      {
        heading: 'AI Screeners Are Making It Worse.',
        body: 'AI screening tools score AI-generated resumes. You\'re paying to automate the selection of another AI agent. HR agencies bring the same unverified pool — they believe the resume too. Technical interviews test performance under pressure, not proof of actual work. LinkedIn says everyone is great. Including people who cannot code.'
      },
      {
        heading: 'One Verified Profile. Every Platform.',
        body: 'Candidates connect once. Verification runs across all their work platforms simultaneously. You receive a tamper-proof credential with signal score, contribution index, verified skill stack, and shipped projects — ready before the first screen. Embed into your existing ATS via our API. No workflow change. Pure signal.'
      }
    ],
    visualType: 'signal-dashboard'
  },
  {
    id: 'enterprise',
    label: 'ENTERPRISE & API',
    title: 'The trust layer for work. Built to sit under everything.',
    subtitle: 'The way Stripe sits under payments — invisible, essential.',
    bullets: [
      {
        heading: 'Verification Infrastructure, Not Just a Platform.',
        body: 'Three revenue models: search access to our verified talent pool ($500–2000/month), verification API embedded into your existing hiring tools ($10–30 per call), and enterprise verification with ATS integration and continuous credential monitoring ($20K–100K annual). The pool grows virally — free forever for candidates. You pay for the signal.'
      },
      {
        heading: 'The Standard Nobody Has Built Yet.',
        body: 'Credentials verified directly at source — no platform cooperation needed. Permanent, portable, owned by the candidate. Any company, any platform, any country can verify by reading the chain. We don\'t just verify developers. Any role that leaves a digital trail — designers, PMs, marketers, sales, finance — is next. This is the verified work standard. The window to own it is now.'
      }
    ],
    visualType: 'infrastructure'
  }
];

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(TAB_DATA[0]);

  return (
    <div className="w-full min-h-screen bg-[#f3f3f1] py-12 px-6 flex flex-col items-center justify-center font-sans selection:bg-orange-200">
      <div className="w-full max-w-6xl">
        
        {/* --- TAB NAVIGATION BAR --- */}
        <div className="flex border-b border-gray-300 overflow-x-auto no-scrollbar mb-8 justify-between text-xs font-bold tracking-wider text-gray-500">
          {TAB_DATA.map((tab) => {
            const isActive = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 whitespace-nowrap transition-colors relative duration-200 hover:text-black ${
                  isActive ? 'text-black' : 'text-gray-400'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#d95438]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* --- MAIN DISPLAY PANEL WITH INTERACTIVE TRANSITION --- */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm min-h-[580px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              
              {/* LEFT SIDE: TEXT PRESENTATION */}
              <div className="md:col-span-5 flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-tight">
                    {activeTab.title}
                  </h2>
                  <p className="text-base text-gray-500 mt-2 font-medium">
                    {activeTab.subtitle}
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-gray-100">
                  {activeTab.bullets.map((bullet, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <h4 className="text-sm font-bold text-black">
                        {bullet.heading}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-normal">
                        {bullet.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: DYNAMIC VISUAL ELEMENT MOCKUPS */}
              <div className="md:col-span-7 bg-[#f9f9f8] rounded-2xl border border-gray-100 p-6 flex items-center justify-center min-h-[380px] relative overflow-hidden">
                <VisualMockup type={activeTab.visualType} />
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENT FOR RENDERING GRAPHIC SIMULATIONS ---
function VisualMockup({ type }: { type: string }) {
  // Nested staggered fade-in animations for specific inner graphics elements
  const assetVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.15, duration: 0.4, ease: "easeOut" } }
  };

  switch (type) {
    case 'shipping-card':
      return (
        <motion.div variants={assetVariants} initial="hidden" animate="visible" className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-[#f0be53] p-4 text-black flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/10 px-1.5 py-0.5 rounded">Overview</span>
              <h3 className="font-bold text-sm mt-1">#570 • Receive Supplier Shipment</h3>
              <p className="text-[11px] opacity-80">Starts Feb 15, 3:30PM</p>
            </div>
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">20m ago</span>
          </div>
          <div className="p-4 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between border-b border-gray-100 pb-1.5">
              <span className="font-medium text-gray-400">Purchase Order</span>
              <span className="font-bold text-black">PO-40091</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-1.5">
              <span className="font-medium text-gray-400">Total Amount</span>
              <span className="font-bold text-black">23</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-400">Status</span>
              <span className="text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">Arrived</span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 flex justify-end">
            <button className="bg-[#e45a3c] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
              NEXT ACTION <span>→</span>
            </button>
          </div>
        </motion.div>
      );

    case 'timeline':
      return (
        <motion.div variants={assetVariants} initial="hidden" animate="visible" className="w-full h-48 flex flex-col justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-[11px]">
          <div className="flex justify-between text-gray-400 font-bold border-b pb-2">
            <span>DEC 2024 / 2</span>
            <span>DEC 9</span>
            <span>DEC 13</span>
          </div>
          <div className="space-y-2 relative pl-4 border-l-2 border-orange-500 my-2">
            <div className="bg-gray-50 p-2 rounded border border-gray-200 font-medium">Weigh Batch Material</div>
            <div className="bg-gray-100 p-2 rounded text-gray-400 line-through">Inspect production access</div>
          </div>
          <div className="text-right text-[10px] text-gray-400 font-medium">Create batch setup ✨</div>
        </motion.div>
      );

    case 'charts':
      return (
        <motion.div variants={assetVariants} initial="hidden" animate="visible" className="w-full space-y-3 p-2">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-black">pH vs. Target</span>
              <span className="text-xs font-extrabold text-[#e45a3c]">62.4 / 74.2</span>
            </div>
            <div className="h-16 w-full flex items-end gap-1.5 pt-2">
              {[40, 55, 48, 70, 62, 85, 64, 78, 90, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-gray-100 rounded-t relative group" style={{ height: `${h}%` }}>
                  {i === 4 && <div className="absolute inset-0 bg-[#e45a3c] rounded-t" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );

    case 'cavity-plot':
      return (
        <motion.div variants={assetVariants} initial="hidden" animate="visible" className="w-full max-w-sm bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <span className="text-xs font-bold text-gray-700 block mb-1">Cavity vs Pressure Target</span>
          <p className="text-[10px] text-gray-400 mb-4">Injection Molding - Automotive Parts</p>
          <div className="h-24 w-full border-b border-l border-gray-200 flex items-center justify-around relative px-2">
            <svg className="absolute inset-0 w-full h-full p-1" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,30 50,60 T100,20" fill="none" stroke="#e45a3c" strokeWidth="2" />
              <path d="M0,55 Q25,45 50,40 T100,45" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
            </svg>
          </div>
          <div className="flex justify-center gap-3 text-[9px] font-medium text-gray-400 mt-3">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e45a3c]"/>Actual</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-300 rounded-full"/>Target Threshold</span>
          </div>
        </motion.div>
      );

    case 'hardware-device':
      return (
        <motion.div 
          variants={assetVariants} 
          initial="hidden" 
          animate="visible" 
          className="w-36 h-36 bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl shadow-xl border border-gray-300/60 flex flex-col items-center justify-center p-3 relative transform rotate-12"
        >
          <div className="w-full flex justify-between text-[8px] text-gray-400 font-mono px-1">
            <span>UNIT-A</span>
            <span className="text-green-500 animate-pulse">●</span>
          </div>
          <div className="w-24 h-12 bg-white rounded-xl my-3 shadow-inner border border-gray-200 flex flex-col items-center justify-center">
            <span className="text-[9px] text-gray-400 tracking-wider font-bold">SCRAP %</span>
            <span className="text-sm font-black text-gray-800">0.02%</span>
          </div>
          <button className="w-10 h-10 bg-[#e45a3c] rounded-full shadow-md active:scale-95 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
            OK
          </button>
        </motion.div>
      );

    default:
      return null;
  }
}