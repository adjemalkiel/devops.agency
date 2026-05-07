import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./HomePage').then((m) => ({ default: m.HomePage })))
const FrenchHomePage = lazy(() => import('./FrenchHomePage').then((m) => ({ default: m.FrenchHomePage })))
const PortfolioPage = lazy(() => import('./PortfolioPage').then((m) => ({ default: m.PortfolioPage })))
const FrenchPortfolioPage = lazy(() => import('./FrenchPortfolioPage').then((m) => ({ default: m.FrenchPortfolioPage })))
const ServicesPage = lazy(() => import('./ServicesPage').then((m) => ({ default: m.ServicesPage })))
const FrenchServicesPage = lazy(() => import('./FrenchServicesPage').then((m) => ({ default: m.FrenchServicesPage })))
const TechnologiesPage = lazy(() => import('./TechnologiesPage').then((m) => ({ default: m.TechnologiesPage })))
const FrenchTechnologiesPage = lazy(() =>
  import('./FrenchTechnologiesPage').then((m) => ({ default: m.FrenchTechnologiesPage })),
)
const AboutPage = lazy(() => import('./AboutPage').then((m) => ({ default: m.AboutPage })))
const FrenchAboutPage = lazy(() => import('./FrenchAboutPage').then((m) => ({ default: m.FrenchAboutPage })))
const AwardsPage = lazy(() => import('./AwardsPage').then((m) => ({ default: m.AwardsPage })))
const FrenchAwardsPage = lazy(() => import('./FrenchAwardsPage').then((m) => ({ default: m.FrenchAwardsPage })))
const ContactsPage = lazy(() => import('./ContactsPage').then((m) => ({ default: m.ContactsPage })))
const FrenchContactsPage = lazy(() => import('./FrenchContactsPage').then((m) => ({ default: m.FrenchContactsPage })))
const PrivacyPage = lazy(() => import('./PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const FrenchPrivacyPage = lazy(() => import('./FrenchPrivacyPage').then((m) => ({ default: m.FrenchPrivacyPage })))
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
        <Route path="/portfolio/*" element={<PortfolioPage />} />
        <Route path="/fr/portfolio/*" element={<FrenchPortfolioPage />} />
        <Route path="/services/*" element={<ServicesPage />} />
        <Route path="/fr/services/*" element={<FrenchServicesPage />} />
        <Route path="/technologies/*" element={<TechnologiesPage />} />
        <Route path="/fr/technologies/*" element={<FrenchTechnologiesPage />} />
        <Route path="/about/*" element={<AboutPage />} />
        <Route path="/fr/about/*" element={<FrenchAboutPage />} />
        <Route path="/awards/*" element={<AwardsPage />} />
        <Route path="/fr/awards/*" element={<FrenchAwardsPage />} />
        <Route path="/contacts/*" element={<ContactsPage />} />
        <Route path="/fr/contacts/*" element={<FrenchContactsPage />} />
        <Route path="/privacy/*" element={<PrivacyPage />} />
        <Route path="/fr/privacy/*" element={<FrenchPrivacyPage />} />
      </Routes>
    </Suspense>
  )
}
