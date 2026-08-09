import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "./context/ThemeContext"
import { LangProvider } from "./context/LangContext"
import { AuthProvider } from "./context/AuthContext"
import Header from "./components/navigation/Header"
import Footer from "./components/Footer"
import RouteFallback from "./components/motion/RouteFallback"
import DashboardLayout from "./components/DashboardLayout"

const Home = lazy(() => import("./pages/Home"))
const Services = lazy(() => import("./pages/Services"))
const WhyUs = lazy(() => import("./pages/WhyUs"))
const Blog = lazy(() => import("./pages/Blog"))
const Contact = lazy(() => import("./pages/Contact"))
const Gastronomia = lazy(() => import("./pages/Gastronomia"))
const GestionPymes = lazy(() => import("./pages/GestionPymes"))
const Turnos = lazy(() => import("./pages/Turnos"))
const Demos = lazy(() => import("./pages/Demos"))
const Precios = lazy(() => import("./pages/Precios"))
const Nosotros = lazy(() => import("./pages/Nosotros"))
const NotFound = lazy(() => import("./pages/NotFound"))

const Login = lazy(() => import("./pages/Login"))
const DashboardHome = lazy(() => import("./pages/DashboardHome"))
const AiImages = lazy(() => import("./pages/AiImages"))
const CrearImagen = lazy(() => import("./pages/CrearImagen"))
const MisDisenos = lazy(() => import("./pages/MisDisenos"))

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
    <div className="min-h-screen bg-paper text-text flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function AppContent() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname === "/login"

  if (isDashboard) {
    if (location.pathname === "/login") {
      return (
        <Suspense fallback={<RouteFallback />}>
          <Login />
        </Suspense>
      )
    }
    const dashboardRoutes = [
      { path: "/dashboard", element: <DashboardHome /> },
      { path: "/dashboard/ai-images", element: <AiImages /> },
      { path: "/dashboard/crear-imagen", element: <CrearImagen /> },
      { path: "/dashboard/mis-disenos", element: <MisDisenos /> },
    ]
    return (
      <DashboardLayout>
        <Routes location={location}>
          {dashboardRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<Suspense fallback={<RouteFallback />}>{element}</Suspense>}
            />
          ))}
        </Routes>
      </DashboardLayout>
    )
  }

  return (
    <PublicShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/why-us" element={<PageTransition><WhyUs /></PageTransition>} />
          <Route path="/gastronomia" element={<PageTransition><Gastronomia /></PageTransition>} />
          <Route path="/gestion-pymes" element={<PageTransition><GestionPymes /></PageTransition>} />
          <Route path="/turnos" element={<PageTransition><Turnos /></PageTransition>} />
          <Route path="/demos" element={<PageTransition><Demos /></PageTransition>} />
          <Route path="/precios" element={<PageTransition><Precios /></PageTransition>} />
          <Route path="/nosotros" element={<PageTransition><Nosotros /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </PublicShell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
