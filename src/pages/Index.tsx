import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppNavigation } from '@/components/AppNavigation';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TeenSection, Emotion } from '@/components/TeenSection';
import { ProcessingSection } from '@/components/ProcessingSection';
import { ParentSection } from '@/components/ParentSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { analyzeEmotion, GeminiResponse } from '@/services/gemini';

type AppState = 'input' | 'processing' | 'result';

function AppContent() {
  const [appState, setAppState] = useState<AppState>('input');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(null);
  const [childMessage, setChildMessage] = useState('');
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(null);

  const handleTeenSubmit = async (emotion: Emotion, message: string) => {
    setSelectedEmotion(emotion);
    setChildMessage(message);
    setAppState('processing');
    
    try {
      // Call Gemini API for analysis
      const response = await analyzeEmotion(emotion || '', message);
      setGeminiResponse(response);
    } catch (error) {
      console.error('Error analyzing emotion:', error);
      // Continue with fallback response
    }
  };

  const handleReset = () => {
    setSelectedEmotion(null);
    setChildMessage('');
    setGeminiResponse(null);
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
      <AppNavigation />
      <Header />
      <HeroSection />
      
      {appState === 'input' && (
        <TeenSection onSubmit={handleTeenSubmit} />
      )}
      
      {appState === 'processing' && (
        <ProcessingSection />
      )}
      
      {appState === 'result' && (
        <ParentSection 
          emotion={selectedEmotion} 
          childMessage={childMessage}
          geminiResponse={geminiResponse}
          onReset={handleReset} 
        />
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
