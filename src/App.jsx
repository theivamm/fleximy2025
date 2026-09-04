import { lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "./context/ThemeContext"
import Header from "./components/navigation/Header"
import Footer from "./components/Footer"
import Seo from "./components/seo/Seo"
import WhatsAppContact from "./components/WhatsAppContact"
import SocialProofWidget from "./components/SocialProofWidget"

const Home = lazy(() => import("./pages/Home"))
const NfcSolution = lazy(() => import("./pages/NfcSolution"))
const Privacidad = lazy(() => import("./pages/Privacidad"))
const Terminos = lazy(() => import("./pages/Terminos"))
const NotFound = lazy(() => import("./pages/NotFound"))

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function PublicShell({ children }) {
  return (
    <div className="min-h-screen bg-bg-0 text-text-1 flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <WhatsAppContact />
      <Footer />
      <SocialProofWidget />
    </div>
  )
}

function AppContent() {
  const location = useLocation()
  return (
    <>
      <Seo />
      <PublicShell>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/soluciones/nfc" element={<PageTransition><NfcSolution /></PageTransition>} />
            <Route path="/nfc-service" element={<Navigate to="/soluciones/nfc" replace />} />
            <Route path="/privacidad" element={<PageTransition><Privacidad /></PageTransition>} />
            <Route path="/terminos" element={<PageTransition><Terminos /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </PublicShell>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  )
}
