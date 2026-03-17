import React, { useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { ThemeProvider, useTheme } from './components/ThemeContext'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SectionWave from './components/SectionWave'
import ScrollProgress from './components/ScrollProgress'

function BodySync() {
  const { theme } = useTheme()
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.bodyBg
    document.body.style.transition = 'background-color 0.5s ease'
  }, [theme])
  return null
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <ThemeProvider>
    <MotionConfig reducedMotion="user">
      <BodySync />

      <ScrollProgress />

      <AnimatePresence>
        {showLoader && (
          <Loader key="loader" onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.7, delay: showLoader ? 0 : 0.35 }}
      >
        <Navbar />
        <main>
          {/* canvas waves show only in Hero */}
          <Hero />
          <SectionWave />                  {/* canvas → light  (no solidBlue) */}

          <About />
          <SectionWave flip solidBlue />   {/* light  → solid blue */}

          <Experience />
          <SectionWave solidBlue />        {/* solid blue → light */}

          <Projects />
          <SectionWave flip solidBlue />   {/* light → solid blue */}

          <Skills />
          <SectionWave solidBlue />        {/* solid blue → light */}

          <Education />
          <SectionWave flip solidBlue />   {/* light → solid blue */}

          <Contact />
        </main>

        {/* ─── OCEAN FLOOR ────────────────────────── */}
        <Footer />
      </motion.div>
    </MotionConfig>
    </ThemeProvider>
  )
}
