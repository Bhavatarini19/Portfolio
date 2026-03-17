import React from 'react'
import { useTheme } from './ThemeContext'

const BUBBLES = [
  { l: '6%',  b: '15%', s: 7,   d: 13, delay: 0   },
  { l: '19%', b: '52%', s: 5,   d: 9,  delay: 3.2 },
  { l: '33%', b: '26%', s: 9,   d: 15, delay: 1.5 },
  { l: '50%', b: '62%', s: 6,   d: 11, delay: 5   },
  { l: '65%', b: '34%', s: 8,   d: 14, delay: 2.8 },
  { l: '80%', b: '20%', s: 5,   d: 10, delay: 4.5 },
  { l: '91%', b: '50%', s: 6.5, d: 12, delay: 1   },
]

const STARS = [
  { l: '4%',  t: '13%', s: 2.2, d: 3.2, delay: 0   },
  { l: '11%', t: '68%', s: 1.8, d: 4.5, delay: 1.2 },
  { l: '20%', t: '34%', s: 2.5, d: 2.8, delay: 0.5 },
  { l: '29%', t: '80%', s: 2,   d: 3.8, delay: 2   },
  { l: '38%', t: '22%', s: 2.4, d: 5,   delay: 0.8 },
  { l: '47%', t: '55%', s: 1.8, d: 3,   delay: 1.5 },
  { l: '55%', t: '88%', s: 2.1, d: 4.2, delay: 0.3 },
  { l: '64%', t: '42%', s: 2.3, d: 2.6, delay: 1.8 },
  { l: '73%', t: '17%', s: 1.9, d: 3.6, delay: 0.7 },
  { l: '82%', t: '74%', s: 2.2, d: 4.8, delay: 1   },
  { l: '89%', t: '30%', s: 2,   d: 3,   delay: 2.3 },
  { l: '95%', t: '58%', s: 1.8, d: 2.4, delay: 0.4 },
]

export default function SectionBg() {
  const { theme: t } = useTheme()

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
    }}>
      {t.isDark
        ? STARS.map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: s.l, top: s.t,
              width: s.s, height: s.s,
              borderRadius: '50%',
              backgroundColor: 'rgba(180,220,255,0.70)',
              animation: `section-twinkle ${s.d}s ease-in-out ${s.delay}s infinite`,
            }} />
          ))
        : BUBBLES.map((b, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: b.l, bottom: b.b,
              width: b.s, height: b.s,
              borderRadius: '50%',
              border: '1.5px solid rgba(26,104,130,0.35)',
              backgroundColor: 'rgba(26,104,130,0.10)',
              animation: `section-rise ${b.d}s ease-in ${b.delay}s infinite`,
            }} />
          ))
      }
    </div>
  )
}
