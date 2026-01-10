import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TeenSection, Emotion } from '@/components/TeenSection';
import { ProcessingSection } from '@/components/ProcessingSection';
import { ParentSection } from '@/components/ParentSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

type AppState = 'input' | 'processing' | 'result';

function AppContent() {
  const [appState, setAppState] = useState<AppState>('input');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(null);

  const handleTeenSubmit = (emotion: Emotion, _message: string) => {
    setSelectedEmotion(emotion);
    setAppState('processing');
  };

  const handleReset = () => {
    setSelectedEmotion(null);
    setAppState('input');
    // Scroll to teen section
    setTimeout(() => {
      const element = document.getElementById('teen');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Simulate processing time
  useEffect(() => {
    if (appState === 'processing') {
      const timer = setTimeout(() => {
        setAppState('result');
        // Scroll to parent section
        setTimeout(() => {
          const element = document.getElementById('parent');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {appState === 'input' && (
        <TeenSection onSubmit={handleTeenSubmit} />
      )}
      
      {appState === 'processing' && (
        <ProcessingSection />
      )}
      
      {appState === 'result' && (
        <ParentSection emotion={selectedEmotion} onReset={handleReset} />
      )}
      
      <AboutSection />
      <Footer />
    </div>
  );
}

const Index = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default Index;
