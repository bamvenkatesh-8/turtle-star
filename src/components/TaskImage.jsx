// Inline SVG illustrations for each task - kid-friendly, colorful cartoon style

const IMAGES = {
  'wake-up': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="55" r="28" fill="#FDE68A" stroke="#F59E0B" strokeWidth="3"/>
      <circle cx="40" cy="50" r="4" fill="#1F2937"/>
      <circle cx="60" cy="50" r="4" fill="#1F2937"/>
      <path d="M40 65 Q50 73 60 65" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Sun rays */}
      <line x1="50" y1="10" x2="50" y2="20" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="75" y1="20" x2="68" y2="27" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="85" y1="45" x2="75" y2="45" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="25" y1="20" x2="32" y2="27" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="15" y1="45" x2="25" y2="45" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
      {/* Rosy cheeks */}
      <circle cx="36" cy="58" r="5" fill="#FCA5A5" opacity="0.6"/>
      <circle cx="64" cy="58" r="5" fill="#FCA5A5" opacity="0.6"/>
    </svg>
  ),
  'pray-time': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Warm glow */}
      <circle cx="50" cy="65" r="32" fill="#FEF3C7" opacity="0.7"/>
      {/* Radiating light dots above — NO cross */}
      <circle cx="50" cy="9" r="3.5" fill="#FCD34D"/>
      <circle cx="40" cy="13" r="2.5" fill="#FBBF24"/>
      <circle cx="60" cy="13" r="2.5" fill="#FBBF24"/>
      <circle cx="32" cy="21" r="2" fill="#FDE68A"/>
      <circle cx="68" cy="21" r="2" fill="#FDE68A"/>
      <circle cx="26" cy="31" r="1.5" fill="#FCD34D" opacity="0.7"/>
      <circle cx="74" cy="31" r="1.5" fill="#FCD34D" opacity="0.7"/>
      {/* Fingers — 5 rounded rects pressed together, middle tallest */}
      <rect x="30" y="40" width="8" height="26" rx="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="37" y="34" width="8" height="32" rx="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="46" y="29" width="8" height="37" rx="4" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
      <rect x="54" y="34" width="8" height="32" rx="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="62" y="40" width="8" height="26" rx="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5"/>
      {/* Joined palms */}
      <rect x="27" y="63" width="46" height="22" rx="11" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
      {/* Thumbs on outside */}
      <path d="M27 72 Q18 68 19 78 Q20 85 30 84" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M73 72 Q82 68 81 78 Q80 85 70 84" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  'brush-teeth': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bt-handle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA"/>
          <stop offset="100%" stopColor="#38BDF8"/>
        </linearGradient>
        <linearGradient id="bt-head" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0E7FF"/>
          <stop offset="100%" stopColor="#C7D2FE"/>
        </linearGradient>
      </defs>
      {/* Handle */}
      <rect x="41" y="54" width="18" height="40" rx="9" fill="url(#bt-handle)" stroke="#7C3AED" strokeWidth="1.5"/>
      {/* Grip ridges on handle */}
      <rect x="44" y="63" width="12" height="3" rx="1.5" fill="white" opacity="0.35"/>
      <rect x="44" y="71" width="12" height="3" rx="1.5" fill="white" opacity="0.35"/>
      <rect x="44" y="79" width="12" height="3" rx="1.5" fill="white" opacity="0.35"/>
      {/* Brush head */}
      <rect x="34" y="12" width="32" height="46" rx="9" fill="url(#bt-head)" stroke="#818CF8" strokeWidth="2"/>
      {/* Bristles — 5 columns, 2 rows */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={38 + i*4.5} y="8" width="3" height="12" rx="1.5" fill="white" stroke="#C7D2FE" strokeWidth="0.5"/>
          <rect x={38 + i*4.5} y="22" width="3" height="10" rx="1.5" fill="#E0E7FF" stroke="#C7D2FE" strokeWidth="0.5"/>
        </g>
      ))}
      {/* Toothpaste squiggle on bristle area */}
      <path d="M36 38 Q42 32 50 38 Q58 44 64 38" stroke="#34D399" strokeWidth="5" fill="none" strokeLinecap="round"/>
      {/* Foam bubbles */}
      <circle cx="34" cy="42" r="3.5" fill="white" opacity="0.85"/>
      <circle cx="66" cy="40" r="3" fill="white" opacity="0.85"/>
      <circle cx="50" cy="48" r="2.5" fill="white" opacity="0.75"/>
      <circle cx="40" cy="50" r="2" fill="white" opacity="0.65"/>
      <circle cx="60" cy="50" r="2" fill="white" opacity="0.65"/>
      {/* Sparkle stars */}
      <circle cx="20" cy="22" r="2" fill="#FCD34D"/>
      <circle cx="18" cy="30" r="1.5" fill="#FCD34D" opacity="0.8"/>
      <circle cx="80" cy="25" r="2" fill="#FCD34D"/>
      <circle cx="82" cy="35" r="1.5" fill="#FCD34D" opacity="0.8"/>
    </svg>
  ),
  'wash-face': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Face */}
      <circle cx="50" cy="45" r="28" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      {/* Eyes closed (washing) */}
      <path d="M38 42 Q43 38 48 42" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M52 42 Q57 38 62 42" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M40 56 Q50 63 60 56" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Water drops */}
      <path d="M20 20 Q18 27 22 27 Q26 27 24 20 Z" fill="#60A5FA"/>
      <path d="M75 15 Q73 22 77 22 Q81 22 79 15 Z" fill="#60A5FA"/>
      <path d="M30 10 Q28 16 32 16 Q36 16 34 10 Z" fill="#93C5FD"/>
      <path d="M65 8 Q63 14 67 14 Q71 14 69 8 Z" fill="#93C5FD"/>
      {/* Bubbles */}
      <circle cx="50" cy="15" r="4" fill="none" stroke="#60A5FA" strokeWidth="1.5"/>
      <circle cx="40" cy="20" r="3" fill="none" stroke="#93C5FD" strokeWidth="1.5"/>
    </svg>
  ),
  'wash-hands': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hands */}
      <path d="M25 75 Q20 55 30 40 L35 35 Q38 30 43 35 L45 55" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      <path d="M75 75 Q80 55 70 40 L65 35 Q62 30 57 35 L55 55" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      <ellipse cx="50" cy="68" rx="25" ry="15" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      {/* Water/soap bubbles */}
      <circle cx="42" cy="30" r="6" fill="none" stroke="#60A5FA" strokeWidth="2"/>
      <circle cx="58" cy="25" r="5" fill="none" stroke="#93C5FD" strokeWidth="2"/>
      <circle cx="50" cy="15" r="4" fill="none" stroke="#60A5FA" strokeWidth="2"/>
      {/* Water drops */}
      <path d="M30 20 Q28 27 32 27 Q36 27 34 20 Z" fill="#60A5FA"/>
      <path d="M68 18 Q66 25 70 25 Q74 25 72 18 Z" fill="#60A5FA"/>
    </svg>
  ),
  'get-dressed': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* T-shirt */}
      <path d="M25 30 L15 50 L30 55 L30 85 L70 85 L70 55 L85 50 L75 30 Q65 20 50 25 Q35 20 25 30Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2"/>
      {/* Collar */}
      <path d="M50 25 Q45 32 50 35 Q55 32 50 25" fill="#EC4899"/>
      {/* Sleeve details */}
      <path d="M15 50 L30 55" stroke="#DB2777" strokeWidth="1.5" fill="none"/>
      <path d="M85 50 L70 55" stroke="#DB2777" strokeWidth="1.5" fill="none"/>
      {/* Star decoration */}
      <text x="45" y="68" fontSize="18" fill="white">⭐</text>
    </svg>
  ),
  'eat-breakfast': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Bowl */}
      <ellipse cx="50" cy="70" rx="35" ry="15" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5"/>
      <path d="M15 60 Q15 85 50 85 Q85 85 85 60 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2.5"/>
      {/* Cereal/food */}
      <circle cx="38" cy="65" r="5" fill="#FCA5A5"/>
      <circle cx="50" cy="62" r="5" fill="#86EFAC"/>
      <circle cx="62" cy="65" r="5" fill="#FCD34D"/>
      <circle cx="44" cy="72" r="4" fill="#93C5FD"/>
      <circle cx="56" cy="72" r="4" fill="#F9A8D4"/>
      {/* Spoon */}
      <ellipse cx="80" cy="40" rx="6" ry="4" fill="#D1D5DB"/>
      <rect x="78" y="44" width="4" height="25" rx="2" fill="#D1D5DB"/>
      {/* Steam */}
      <path d="M42 40 Q45 33 42 26" stroke="#FCA5A5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M50 38 Q53 31 50 24" stroke="#FCA5A5" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  'pack-bag': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Backpack */}
      <rect x="20" y="35" width="60" height="55" rx="10" fill="#60A5FA" stroke="#2563EB" strokeWidth="2.5"/>
      {/* Strap top */}
      <path d="M35 35 Q35 20 50 18 Q65 20 65 35" fill="none" stroke="#2563EB" strokeWidth="3"/>
      {/* Pocket */}
      <rect x="30" y="55" width="40" height="25" rx="6" fill="#3B82F6" stroke="#2563EB" strokeWidth="2"/>
      {/* Zipper */}
      <path d="M30 60 L70 60" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
      {/* Buckle */}
      <rect x="44" y="38" width="12" height="8" rx="2" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.5"/>
      {/* Stars/decorations */}
      <circle cx="50" cy="47" r="3" fill="#FCD34D"/>
    </svg>
  ),
  'take-bath': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Bathtub */}
      <path d="M10 60 Q10 80 50 80 Q90 80 90 60 Z" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="2.5"/>
      <rect x="10" y="55" width="80" height="8" rx="4" fill="#93C5FD" stroke="#60A5FA" strokeWidth="2"/>
      {/* Legs */}
      <rect x="18" y="80" width="8" height="12" rx="3" fill="#93C5FD"/>
      <rect x="74" y="80" width="8" height="12" rx="3" fill="#93C5FD"/>
      {/* Bubbles */}
      <circle cx="35" cy="50" r="8" fill="none" stroke="#60A5FA" strokeWidth="2"/>
      <circle cx="50" cy="45" r="6" fill="none" stroke="#93C5FD" strokeWidth="2"/>
      <circle cx="65" cy="48" r="7" fill="none" stroke="#60A5FA" strokeWidth="2"/>
      <circle cx="42" cy="35" r="5" fill="none" stroke="#BFDBFE" strokeWidth="1.5"/>
      {/* Faucet */}
      <rect x="72" y="42" width="18" height="6" rx="3" fill="#D1D5DB"/>
      <path d="M82 42 L82 35" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round"/>
      {/* Water drops */}
      <path d="M84 38 Q82 44 84 44 Q86 44 84 38 Z" fill="#60A5FA"/>
    </svg>
  ),
  'put-on-pajamas': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Pajama top */}
      <path d="M28 25 L18 45 L32 50 L32 72 L68 72 L68 50 L82 45 L72 25 Q60 18 50 22 Q40 18 28 25Z" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2"/>
      {/* Collar */}
      <path d="M50 22 Q45 28 50 32 Q55 28 50 22" fill="#8B5CF6"/>
      {/* Moon and stars pattern */}
      <text x="38" y="55" fontSize="14">🌙</text>
      <text x="55" y="62" fontSize="10">⭐</text>
    </svg>
  ),
  'read-a-book': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Book open */}
      <path d="M50 20 L50 85" stroke="#D97706" strokeWidth="3"/>
      <path d="M50 20 Q30 15 10 20 L10 85 Q30 80 50 85 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2"/>
      <path d="M50 20 Q70 15 90 20 L90 85 Q70 80 50 85 Z" fill="#FCD34D" stroke="#D97706" strokeWidth="2"/>
      {/* Text lines on left page */}
      <line x1="18" y1="35" x2="44" y2="33" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="42" x2="44" y2="40" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="49" x2="44" y2="47" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="56" x2="40" y2="54" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Illustration on right page */}
      <circle cx="70" cy="42" r="10" fill="#FCA5A5"/>
      <text x="64" y="76" fontSize="12">📖</text>
    </svg>
  ),
  'lights-out': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Moon */}
      <path d="M60 20 Q38 25 35 50 Q32 75 55 82 Q35 88 20 70 Q10 45 30 25 Q45 10 60 20Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      {/* Stars */}
      <text x="60" y="30" fontSize="14">⭐</text>
      <text x="72" y="55" fontSize="10">✦</text>
      <text x="55" y="65" fontSize="8">✦</text>
      <text x="78" y="72" fontSize="12">✦</text>
      <text x="65" y="42" fontSize="8">✦</text>
      {/* ZZZ */}
      <text x="20" y="50" fontSize="14" fill="#93C5FD" fontWeight="bold">z</text>
      <text x="30" y="40" fontSize="17" fill="#60A5FA" fontWeight="bold">z</text>
      <text x="42" y="28" fontSize="20" fill="#3B82F6" fontWeight="bold">z</text>
    </svg>
  ),
  'have-a-snack': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Apple */}
      <circle cx="50" cy="55" r="30" fill="#EF4444"/>
      <path d="M50 25 Q60 15 70 20 Q65 30 50 28 Z" fill="#22C55E"/>
      <path d="M50 25 Q58 30 55 38" stroke="#16A34A" strokeWidth="2" fill="none"/>
      {/* Shine */}
      <ellipse cx="38" cy="42" rx="6" ry="8" fill="white" opacity="0.3" transform="rotate(-20 38 42)"/>
      {/* Leaf */}
      <path d="M60 18 Q72 12 74 22 Q68 28 60 18Z" fill="#16A34A"/>
    </svg>
  ),
  'do-homework': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Paper/notebook */}
      <rect x="15" y="15" width="55" height="70" rx="5" fill="white" stroke="#D1D5DB" strokeWidth="2.5"/>
      <rect x="15" y="15" width="55" height="15" rx="5" fill="#60A5FA"/>
      {/* Spiral binding */}
      {[0,1,2,3,4,5].map(i => (
        <circle key={i} cx="15" cy={22 + i * 10} r="3" fill="#3B82F6" stroke="white" strokeWidth="1"/>
      ))}
      {/* Lines */}
      <line x1="25" y1="42" x2="62" y2="42" stroke="#E5E7EB" strokeWidth="1.5"/>
      <line x1="25" y1="52" x2="62" y2="52" stroke="#E5E7EB" strokeWidth="1.5"/>
      <line x1="25" y1="62" x2="55" y2="62" stroke="#E5E7EB" strokeWidth="1.5"/>
      {/* Pencil */}
      <rect x="65" y="30" width="8" height="45" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" transform="rotate(20 65 30)"/>
      <path d="M79 68 L83 80 L75 76 Z" fill="#1F2937" transform="rotate(20 65 30)"/>
    </svg>
  ),
  'play-time': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Ball */}
      <circle cx="50" cy="55" r="28" fill="#F472B6" stroke="#DB2777" strokeWidth="2.5"/>
      <path d="M30 35 Q50 42 70 35" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M22 55 Q50 65 78 55" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M30 75 Q50 67 70 75" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M50 27 Q43 55 50 83" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M50 27 Q57 55 50 83" stroke="white" strokeWidth="2" fill="none"/>
      {/* Stars around */}
      <text x="8" y="25" fontSize="16">⭐</text>
      <text x="75" y="20" fontSize="12">✦</text>
      <text x="80" y="80" fontSize="14">✦</text>
    </svg>
  ),
  'clean-up-toys': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Box/bin */}
      <rect x="15" y="50" width="70" height="40" rx="5" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5"/>
      <rect x="10" y="45" width="80" height="12" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="2"/>
      {/* Toys in box */}
      <text x="22" y="82" fontSize="14">🚗</text>
      <text x="48" y="82" fontSize="14">🧸</text>
      {/* Toy on floor (being picked up) */}
      <text x="55" y="30" fontSize="18">⭐</text>
      {/* Arrow showing picking up */}
      <path d="M60 32 Q65 40 60 48" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M60 48 L56 42 M60 48 L66 43" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  'drink-water': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 30 L35 85 L65 85 L70 30 Z" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="2.5"/>
      <path d="M30 30 L70 30 L67 40 L33 40 Z" fill="#93C5FD"/>
      {/* Water */}
      <path d="M35 60 Q50 55 65 60 L65 85 L35 85 Z" fill="#3B82F6" opacity="0.4"/>
      {/* Bubbles */}
      <circle cx="43" cy="70" r="3" fill="white" opacity="0.6"/>
      <circle cx="55" cy="65" r="2" fill="white" opacity="0.6"/>
      <circle cx="50" cy="75" r="2.5" fill="white" opacity="0.6"/>
    </svg>
  ),
  'eat-lunch': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="65" rx="35" ry="20" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5"/>
      <text x="32" y="72" fontSize="22">🍕</text>
      <rect x="25" y="40" width="4" height="25" rx="2" fill="#D1D5DB"/>
      <ellipse cx="27" cy="38" rx="6" ry="4" fill="#D1D5DB"/>
      <rect x="71" y="40" width="4" height="25" rx="2" fill="#D1D5DB"/>
      <ellipse cx="73" cy="38" rx="6" ry="4" fill="#D1D5DB"/>
    </svg>
  ),
  'eat-dinner': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="65" rx="35" ry="20" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5"/>
      <text x="32" y="72" fontSize="22">🍽️</text>
      <rect x="25" y="40" width="4" height="25" rx="2" fill="#D1D5DB"/>
      <rect x="71" y="40" width="4" height="25" rx="2" fill="#D1D5DB"/>
    </svg>
  ),
  'exercise': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <text x="25" y="65" fontSize="55">🤸</text>
    </svg>
  ),
  'brush-hair': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="50" cy="42" r="25" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      {/* Hair */}
      <path d="M25 30 Q30 10 50 12 Q70 10 75 30" fill="#D97706"/>
      {/* Eyes */}
      <circle cx="42" cy="40" r="3" fill="#1F2937"/>
      <circle cx="58" cy="40" r="3" fill="#1F2937"/>
      <path d="M42 52 Q50 58 58 52" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Comb/brush */}
      <rect x="70" y="30" width="8" height="35" rx="3" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={67 + i*3.5} y="63" width="2" height="8" rx="1" fill="#DB2777"/>
      ))}
    </svg>
  ),
  'make-bed': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Bed frame */}
      <rect x="8" y="55" width="84" height="35" rx="5" fill="#D97706" stroke="#92400E" strokeWidth="2"/>
      {/* Mattress */}
      <rect x="12" y="45" width="76" height="20" rx="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      {/* Pillow */}
      <ellipse cx="35" cy="47" rx="18" ry="10" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
      {/* Blanket */}
      <path d="M55 47 L88 52 L88 62 L55 55 Z" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5"/>
      {/* Stars on blanket */}
      <text x="62" y="58" fontSize="10">⭐</text>
    </svg>
  ),
  'feed-pet': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Bowl */}
      <ellipse cx="50" cy="72" rx="30" ry="12" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5"/>
      <path d="M20 65 Q20 80 50 80 Q80 80 80 65 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
      {/* Food in bowl */}
      <circle cx="40" cy="68" r="5" fill="#F97316"/>
      <circle cx="52" cy="65" r="5" fill="#EF4444"/>
      <circle cx="62" cy="69" r="5" fill="#F59E0B"/>
      {/* Pet paw */}
      <text x="28" y="40" fontSize="35">🐾</text>
    </svg>
  ),
  'tidy-room': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Broom */}
      <rect x="60" y="10" width="6" height="60" rx="3" fill="#D97706" transform="rotate(15 60 10)"/>
      <path d="M55 62 Q65 68 75 58 Q72 80 60 80 Q48 80 45 68 Z" fill="#F59E0B"/>
      {/* Dust particles */}
      <circle cx="30" cy="70" r="4" fill="#D1D5DB"/>
      <circle cx="40" cy="65" r="3" fill="#E5E7EB"/>
      <circle cx="22" cy="62" r="3" fill="#D1D5DB"/>
      {/* Sparkle */}
      <text x="8" y="40" fontSize="20">✨</text>
    </svg>
  ),
  'placeholder': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="3"/>
      <text x="30" y="62" fontSize="36">✓</text>
    </svg>
  ),
}

export default function TaskImage({ imageKey, className = '', completed = false }) {
  const img = IMAGES[imageKey] || IMAGES['placeholder']
  return (
    <div
      className={`transition-all duration-300 ${className}`}
    >
      {img}
    </div>
  )
}
