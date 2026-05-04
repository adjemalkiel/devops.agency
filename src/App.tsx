import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./HomePage').then((m) => ({ default: m.HomePage })))
const FrenchHomePage = lazy(() => import('./FrenchHomePage').then((m) => ({ default: m.FrenchHomePage })))
const Ai3dPage = lazy(() => import('./pages/Ai3dPage').then((m) => ({ default: m.Ai3dPage })))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fr" element={<FrenchHomePage />} />
        <Route path="/fr/" element={<FrenchHomePage />} />
        <Route path="/ai-3d" element={<Ai3dPage />} />
        <Route path="/ai-3d.html" element={<Navigate to="/ai-3d" replace />} />
      </Routes>
    </Suspense>
  )
}
