import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "./context/ThemeContext"
import { LangProvider } from "./context/LangContext"
import Navbar from "./components/Navbar"
import GlobalCTA from "./components/GlobalCTA"
import Footer from "./components/Footer"
import BackgroundOrbs from "./components/BackgroundOrbs"
import Home from "./pages/Home"
import Services from "./pages/Services"
import WhyUs from "./pages/WhyUs"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <BackgroundOrbs />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/why-us" element={<PageTransition><WhyUs /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <GlobalCTA />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <AppContent />
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
