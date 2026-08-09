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
import Seo from "./components/seo/Seo"

const Home = lazy(() => import("./pages/Home"))
const Soluciones = lazy(() => import("./pages/Soluciones"))
const SolucionGastronomia = lazy(() => import("./pages/soluciones/Gastronomia"))
const SolucionTurnos = lazy(() => import("./pages/soluciones/ServiciosTurnos"))
const SolucionGestion = lazy(() => import("./pages/soluciones/GestionPymes"))
const SolucionComercio = lazy(() => import("./pages/soluciones/ComercioRetail"))
const SolucionInmob = lazy(() => import("./pages/soluciones/Inmobiliarias"))
const SolucionEducacion = lazy(() => import("./pages/soluciones/Educacion"))
const SolucionTalleres = lazy(() => import("./pages/soluciones/TalleresReparaciones"))
const Demos = lazy(() => import("./pages/Demos"))
const Precios = lazy(() => import("./pages/Precios"))
const Nosotros = lazy(() => import("./pages/Nosotros"))
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"))
const Contacto = lazy(() => import("./pages/Contacto"))
const GraciasDiagnostico = lazy(() => import("./pages/GraciasDiagnostico"))
const PreguntasFrecuentes = lazy(() => import("./pages/PreguntasFrecuentes"))
const Seguridad = lazy(() => import("./pages/Seguridad"))
const Recursos = lazy(() => import("./pages/Recursos"))
const CasosDeUso = lazy(() => import("./pages/CasosDeUso"))
const Privacidad = lazy(() => import("./pages/Privacidad"))
const Terminos = lazy(() => import("./pages/Terminos"))
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

function renderShell(location, isDashboard) {
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
          <Route path="/soluciones" element={<PageTransition><Soluciones /></PageTransition>} />
          <Route path="/soluciones/gastronomia" element={<PageTransition><SolucionGastronomia /></PageTransition>} />
          <Route path="/soluciones/servicios-turnos" element={<PageTransition><SolucionTurnos /></PageTransition>} />
          <Route path="/soluciones/gestion-pymes" element={<PageTransition><SolucionGestion /></PageTransition>} />
          <Route path="/soluciones/comercio-retail" element={<PageTransition><SolucionComercio /></PageTransition>} />
          <Route path="/soluciones/inmobiliarias" element={<PageTransition><SolucionInmob /></PageTransition>} />
          <Route path="/soluciones/educacion" element={<PageTransition><SolucionEducacion /></PageTransition>} />
          <Route path="/soluciones/talleres-reparaciones" element={<PageTransition><SolucionTalleres /></PageTransition>} />
          <Route path="/demos" element={<PageTransition><Demos /></PageTransition>} />
          <Route path="/como-funciona" element={<PageTransition><ComoFunciona /></PageTransition>} />
          <Route path="/precios" element={<PageTransition><Precios /></PageTransition>} />
          <Route path="/nosotros" element={<PageTransition><Nosotros /></PageTransition>} />
          <Route path="/contacto" element={<PageTransition><Contacto /></PageTransition>} />
          <Route path="/gracias-diagnostico" element={<PageTransition><GraciasDiagnostico /></PageTransition>} />
          <Route path="/preguntas-frecuentes" element={<PageTransition><PreguntasFrecuentes /></PageTransition>} />
          <Route path="/seguridad" element={<PageTransition><Seguridad /></PageTransition>} />
          <Route path="/recursos" element={<PageTransition><Recursos /></PageTransition>} />
          <Route path="/casos-de-uso" element={<PageTransition><CasosDeUso /></PageTransition>} />
          <Route path="/privacidad" element={<PageTransition><Privacidad /></PageTransition>} />
          <Route path="/terminos" element={<PageTransition><Terminos /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </PublicShell>
  )
}

function AppContent() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname === "/login"

  return (
    <>
      <Seo />
      {renderShell(location, isDashboard)}
    </>
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
