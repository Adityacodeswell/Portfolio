// Build Force: v1.0.1
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import About from './components/About';
import Beyond from './components/Beyond';
import Archive from './components/Archive';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import CaseStudy from './components/CaseStudy';
import TrackleCaseStudy from './components/TrackleCaseStudy';
import EcoSmartKilnCaseStudy from './components/EcoSmartKilnCaseStudy';
import SahaayCaseStudy from './components/SahaayCaseStudy';
import SubsenseWIP from './components/SubsenseWIP';
import { TransitionProvider } from './components/PageTransition';
import ArchiveBridge from './components/ArchiveBridge';

import { ContentProvider } from './context/ContentContext';
import AdminPage from './components/admin/AdminPage';

function Landing() {
  return (
    <>
      <Hero />
      <WorkGrid />
      <About />
      <Archive />
      <ArchiveBridge />
      <Beyond />
    </>
  );
}

export default function App() {
  // Trigger comment: force environment variable update and fix cloudinary name
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <ContentProvider>
      <TransitionProvider>
        <SmoothScroll>
          <main className="min-h-screen">
            {!isAdminPage && (
              <>
                <CustomCursor />
                <Navigation />
              </>
            )}
            
            <AnimatePresence mode="wait">
              <Routes location={location}>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/project/trackle" element={<TrackleCaseStudy />} />
                <Route path="/project/eco-smart-kiln" element={<EcoSmartKilnCaseStudy />} />
                <Route path="/project/sahaay" element={<SahaayCaseStudy />} />
                <Route path="/project/subsense" element={<SubsenseWIP />} />
                <Route path="/project/:slug" element={<CaseStudy />} />
              </Routes>
            </AnimatePresence>

            {!isAdminPage && <Footer />}
          </main>
        </SmoothScroll>
      </TransitionProvider>
    </ContentProvider>
  );
}
