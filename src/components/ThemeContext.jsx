import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export const light = {
  isDark: false,
  sectionBlue:  '#C0DFF0',
  sectionLight: '#E0F2FA',
  waveLight:    '#E0F2FA',
  waveBlue:     '#C0DFF0',
  card:         'rgba(255,255,255,0.62)',
  cardBorder:   'rgba(255,255,255,0.55)',
  cardShadow:   '0 10px 25px rgba(0,0,0,0.08)',
  cardHover:    '0 16px 40px rgba(0,0,0,0.13)',
  textPrimary:  '#1C3A50',
  textSecondary:'#3A5E7A',
  textMuted:    '#5A7890',
  accent:       '#1A6882',
  accentBg:     'rgba(26,104,130,0.08)',
  accentBorder: 'rgba(26,104,130,0.16)',
  accentText:   '#1A4A62',
  label:        'rgba(26,104,130,0.80)',
  navBg:        'rgba(255,255,255,0.88)',
  navBorder:    'rgba(255,255,255,0.60)',
  navShadow:    '0 2px 20px rgba(0,60,100,0.12)',
  navText:      '#1A6882',
  navTextMuted: 'rgba(26,80,120,0.65)',
  footerBg:     '#1F6E96',
  bodyBg:       '#94C8E6',
  canvasTop:    [228, 245, 255],
  canvasMid:    [190, 228, 248],
  canvasBot:    [148, 200, 230],
  waveColors: [
    { cr: 70,  cg: 140, cb: 180, ca: 0.20 },
    { cr: 55,  cg: 122, cb: 165, ca: 0.15 },
    { cr: 40,  cg: 105, cb: 148, ca: 0.11 },
  ],
}

export const dark = {
  isDark: true,
  sectionBlue:  '#050F22',
  sectionLight: '#091B35',
  waveLight:    '#091B35',
  waveBlue:     '#050F22',
  card:         'rgba(255,255,255,0.06)',
  cardBorder:   'rgba(140,195,235,0.18)',
  cardShadow:   '0 10px 25px rgba(0,0,0,0.35)',
  cardHover:    '0 16px 40px rgba(0,0,0,0.52)',
  textPrimary:  '#D6EDF8',
  textSecondary:'#8ABACC',
  textMuted:    '#5E8EA8',
  accent:       '#5BAABF',
  accentBg:     'rgba(91,170,191,0.12)',
  accentBorder: 'rgba(91,170,191,0.22)',
  accentText:   '#A8D2E0',
  label:        'rgba(91,170,191,0.75)',
  navBg:        'rgba(5,15,38,0.92)',
  navBorder:    'rgba(70,130,180,0.18)',
  navShadow:    '0 2px 20px rgba(0,5,20,0.55)',
  navText:      '#5BAABF',
  navTextMuted: 'rgba(150,205,225,0.65)',
  footerBg:     '#040C1C',
  bodyBg:       '#030A18',
  canvasTop:    [8,  22, 52],
  canvasMid:    [6,  28, 65],
  canvasBot:    [4,  18, 48],
  waveColors: [
    { cr: 18, cg: 55, cb: 105, ca: 0.40 },
    { cr: 14, cg: 44, cb: 86,  ca: 0.30 },
    { cr: 10, cg: 34, cb: 70,  ca: 0.22 },
  ],
}

const ThemeContext = createContext({ theme: light, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark' } catch { return false }
  })

  // Keep localStorage + html attribute in sync
  React.useEffect(() => {
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light') } catch {}
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = useCallback(() => setIsDark(d => !d), [])
  const value = useMemo(() => ({ theme: isDark ? dark : light, toggle }), [isDark, toggle])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
