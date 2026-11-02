// Build Force: v1.0.1
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import WhyHireMe from './components/WhyHireMe';
import EducationAchievements from './components/EducationAchievements';
import BeyondDesignStage from './components/BeyondDesignStage';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import { TransitionProvider } from './components/PageTransition';

function Landing() {
  return (
    <>
      <Hero />
      <WorkGrid />
      <WhyHireMe />
      <EducationAchievements />
      <BeyondDesignStage />
    </>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <TransitionProvider>
      <SmoothScroll>
        <main className="min-h-screen">
          <Navigation />
          
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route
                path="*"
                element={
                  <section className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <h1 className="text-3xl font-bold">Page not found</h1>
                    <Link to="/" className="text-sm underline underline-offset-4 hover:text-[#FF3B30]">
                      Return to homepage
                    </Link>
                  </section>
                }
              />
            </Routes>
          </AnimatePresence>

          <Footer />
        </main>
      </SmoothScroll>
    </TransitionProvider>
  );
}
