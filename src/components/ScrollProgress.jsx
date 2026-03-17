import { useEffect, useState } from 'react'
import { useTheme } from './ThemeContext'

export default function ScrollProgress() {
  const { theme: t } = useTheme()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (progress <= 0) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 2.5, zIndex: 100, pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${progress * 100}%`,
        background: t.isDark
          ? 'linear-gradient(90deg, #1A6882, #5BAABF, #8dd5e8)'
          : 'linear-gradient(90deg, #1c5965, #2e7d88, #5BAABF)',
        boxShadow: t.isDark ? '0 0 8px rgba(91,170,191,0.65)' : '0 0 6px rgba(26,104,130,0.45)',
        borderRadius: '0 2px 2px 0',
      }} />
    </div>
  )
}
