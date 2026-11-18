import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import SafetyAlgorithm from './pages/SafetyAlgorithm';
import ResourceRequest from './pages/ResourceRequest';
import AllocationMatrix from './pages/AllocationMatrix';
import ExecutionVisualizer from './pages/ExecutionVisualizer';
import Learn from './pages/Learn';
import Settings from './pages/Settings';
import { useSimulation } from './hooks/useSimulation';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sim = useSimulation();

  // Keyboard shortcut listener for simulation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        sim.togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        sim.nextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        sim.prevStep();
      } else if (e.key === 'r' || e.key === 'R') {
        sim.resetSimulation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sim]);

  return (
    <div className="relative min-h-screen bg-[#05070f] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* VisionOS ambient light orbs */}
      <div className="vision-bg-glow">
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />
        <div className="glow-orb-3" />
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      </div>

      {/* Main Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        safetyState={sim.safetyState}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 relative z-10">
        <Topbar
          safetyState={sim.safetyState}
          activePresetId={sim.activePresetId}
          loadPreset={sim.loadPreset}
          resetToDefault={sim.resetToDefault}
          isPlaying={sim.isPlaying}
          togglePlay={sim.togglePlay}
          resetSimulation={sim.resetSimulation}
          soundEnabled={sim.soundEnabled}
          setSoundEnabled={sim.setSoundEnabled}
          setActiveTab={setActiveTab}
          setIsMobileOpen={setIsMobileOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'overview' && (
                <Dashboard
                  allocation={sim.allocation}
                  max={sim.max}
                  need={sim.need}
                  available={sim.available}
                  processNames={sim.processNames}
                  resourceNames={sim.resourceNames}
                  safetyState={sim.safetyState}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'safety' && (
                <SafetyAlgorithm
                  allocation={sim.allocation}
                  max={sim.max}
                  need={sim.need}
                  available={sim.available}
                  processNames={sim.processNames}
                  resourceNames={sim.resourceNames}
                  safetyState={sim.safetyState}
                  steps={sim.steps}
                  currentStepIndex={sim.currentStepIndex}
                  currentStep={sim.currentStep}
                  isPlaying={sim.isPlaying}
                  playbackSpeed={sim.playbackSpeed}
                  setPlaybackSpeed={sim.setPlaybackSpeed}
                  nextStep={sim.nextStep}
                  prevStep={sim.prevStep}
                  goToStep={sim.goToStep}
                  resetSimulation={sim.resetSimulation}
                  togglePlay={sim.togglePlay}
                />
              )}

              {activeTab === 'request' && (
                <ResourceRequest
                  allocation={sim.allocation}
                  max={sim.max}
                  need={sim.need}
                  available={sim.available}
                  processNames={sim.processNames}
                  resourceNames={sim.resourceNames}
                  applyGrantedRequest={sim.applyGrantedRequest}
                />
              )}

              {activeTab === 'matrix' && (
                <AllocationMatrix
                  allocation={sim.allocation}
                  max={sim.max}
                  need={sim.need}
                  available={sim.available}
                  processNames={sim.processNames}
                  resourceNames={sim.resourceNames}
                  validation={sim.validation}
                  updateAllocationCell={sim.updateAllocationCell}
                  updateMaxCell={sim.updateMaxCell}
                  updateAvailableCell={sim.updateAvailableCell}
                  addProcess={sim.addProcess}
                  removeProcess={sim.removeProcess}
                  addResource={sim.addResource}
                  removeResource={sim.removeResource}
                  renameProcess={sim.renameProcess}
                  renameResource={sim.renameResource}
                  resetToDefault={sim.resetToDefault}
                  loadPreset={sim.loadPreset}
                  activePresetId={sim.activePresetId}
                />
              )}

              {activeTab === 'visualizer' && (
                <ExecutionVisualizer
                  allocation={sim.allocation}
                  need={sim.need}
                  available={sim.available}
                  processNames={sim.processNames}
                  resourceNames={sim.resourceNames}
                  safetyState={sim.safetyState}
                  steps={sim.steps}
                  currentStepIndex={sim.currentStepIndex}
                  currentStep={sim.currentStep}
                  isPlaying={sim.isPlaying}
                  playbackSpeed={sim.playbackSpeed}
                  setPlaybackSpeed={sim.setPlaybackSpeed}
                  nextStep={sim.nextStep}
                  prevStep={sim.prevStep}
                  goToStep={sim.goToStep}
                  resetSimulation={sim.resetSimulation}
                  togglePlay={sim.togglePlay}
                />
              )}

              {activeTab === 'learn' && <Learn />}

              {activeTab === 'settings' && (
                <Settings
                  playbackSpeed={sim.playbackSpeed}
                  setPlaybackSpeed={sim.setPlaybackSpeed}
                  soundEnabled={sim.soundEnabled}
                  setSoundEnabled={sim.setSoundEnabled}
                  activePresetId={sim.activePresetId}
                  loadPreset={sim.loadPreset}
                  resetToDefault={sim.resetToDefault}
                  allocation={sim.allocation}
                  max={sim.max}
                  available={sim.available}
                  processNames={sim.processNames}
                  resourceNames={sim.resourceNames}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
