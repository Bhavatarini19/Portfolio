import { motion } from 'framer-motion'
import { useTheme } from './ThemeContext'

export default function SectionWave({ flip = false, solidBlue = false }) {
  const { theme: t } = useTheme()
  const LIGHT = t.waveLight
  const BLUE  = t.waveBlue
  const stroke = t.isDark ? 'rgba(70,140,185,0.18)' : 'rgba(26,104,130,0.20)'

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%', height: 72, overflow: 'hidden',
        position: 'relative', pointerEvents: 'none', flexShrink: 0,
        background: flip ? BLUE : (solidBlue ? BLUE : 'transparent'),
      }}
    >
      <motion.svg
        width="200%" height="72" viewBox="0 0 2880 72"
        preserveAspectRatio="none"
        animate={{ x: [0, -1440] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {flip ? (
          <>
            <path d="M0 0 L0 38 C360 58,720 18,1080 38 C1440 58,1800 18,2160 38 C2520 58,2880 18,3240 38 L3240 0 Z" fill={LIGHT} />
            <path d="M0 38 C360 58,720 18,1080 38 C1440 58,1800 18,2160 38 C2520 58,2880 18,3240 38" stroke={stroke} strokeWidth="1.2" fill="none" />
          </>
        ) : (
          <>
            <path d="M0 34 C360 14,720 54,1080 34 C1440 14,1800 54,2160 34 C2520 14,2880 54,3240 34 L3240 72 L0 72 Z" fill={LIGHT} />
            <path d="M0 34 C360 14,720 54,1080 34 C1440 14,1800 54,2160 34 C2520 14,2880 54,3240 34" stroke={stroke} strokeWidth="1.2" fill="none" />
          </>
        )}
      </motion.svg>

      <motion.svg
        width="200%" height="72" viewBox="0 0 2880 72"
        preserveAspectRatio="none"
        animate={{ x: [0, -1440] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {flip
          ? <path d="M0 30 C360 50,720 10,1080 30 C1440 50,1800 10,2160 30 C2520 50,2880 10,3240 30" stroke={stroke} strokeWidth="0.7" fill="none" opacity="0.6" />
          : <path d="M0 42 C360 22,720 62,1080 42 C1440 22,1800 62,2160 42 C2520 22,2880 62,3240 42" stroke={stroke} strokeWidth="0.7" fill="none" opacity="0.6" />
        }
      </motion.svg>
    </div>
  )
}
