import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.teen': { en: 'Teen Section', hi: 'किशोर अनुभाग' },
  'nav.parent': { en: 'Parent Section', hi: 'माता-पिता अनुभाग' },
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },

  // Hero
  'hero.title': { en: 'Parent–Teen Bridge', hi: 'माता-पिता और किशोर के बीच सेतु' },
  'hero.subtitle': { en: 'A bridge between parents and teens, built on empathy.', hi: 'माता-पिता और किशोरों के बीच सहानुभूति पर बना एक सेतु।' },
  'hero.cta': { en: 'Start Connecting', hi: 'जुड़ना शुरू करें' },

  // Teen Section
  'teen.title': { en: 'How are you feeling today?', hi: 'आज आप कैसा महसूस कर रहे हैं?' },
  'teen.subtitle': { en: 'Select how you feel – it\'s completely safe and private.', hi: 'बताएं कि आप कैसा महसूस कर रहे हैं – यह पूरी तरह सुरक्षित और निजी है।' },
  'teen.optional': { en: 'You can write one line (optional)', hi: 'आप एक पंक्ति लिख सकते हैं (वैकल्पिक)' },
  'teen.submit': { en: 'Share Feeling Safely', hi: 'भावना सुरक्षित रूप से साझा करें' },
  'teen.note': { en: 'Your message will be translated, not shown directly.', hi: 'आपका संदेश अनुवादित होगा, सीधे नहीं दिखाया जाएगा।' },

  // Emotions
  'emotion.sad': { en: 'Sad', hi: 'उदास' },
  'emotion.angry': { en: 'Angry', hi: 'गुस्सा' },
  'emotion.stressed': { en: 'Stressed', hi: 'तनाव' },
  'emotion.happy': { en: 'Happy', hi: 'खुश' },

  // Processing
  'processing.title': { en: 'Understanding emotions…', hi: 'भावनाओं को समझ रहे हैं…' },

  // Parent Section
  'parent.title': { en: 'What your child might be feeling', hi: 'आपका बच्चा क्या महसूस कर रहा होगा' },
  'parent.guidance': { en: 'Guidance for You', hi: 'आपके लिए मार्गदर्शन' },

  // Emotion Messages
  'message.sad': { 
    en: 'Your child may be feeling down or low today. This could be due to something at school, with friends, or just a difficult day. They might need some quiet comfort and reassurance.', 
    hi: 'आज आपके बच्चे को थोड़ा उदास महसूस हो सकता है। यह स्कूल में, दोस्तों के साथ, या बस एक कठिन दिन के कारण हो सकता है। उन्हें शांत सहारा और आश्वासन की जरूरत हो सकती है।' 
  },
  'message.angry': { 
    en: 'Your child is experiencing frustration right now. This is not anger directed at you – it\'s a sign they need space to express themselves and feel heard.', 
    hi: 'आपके बच्चे को अभी निराशा महसूस हो रही है। यह आप पर गुस्सा नहीं है – यह संकेत है कि उन्हें खुद को व्यक्त करने और सुने जाने की जरूरत है।' 
  },
  'message.stressed': { 
    en: 'Your child is feeling academic or social pressure today. This is not anger, but a need for support and reassurance. A calm conversation will help.', 
    hi: 'आज आपके बच्चे को पढ़ाई या सामाजिक दबाव महसूस हो रहा है। यह गुस्सा नहीं है, बल्कि सहारे और आश्वासन की जरूरत है। शांत बातचीत मदद करेगी।' 
  },
  'message.happy': { 
    en: 'Your child is feeling positive and content today! This is a great time to connect, share experiences, and celebrate their happiness together.', 
    hi: 'आज आपका बच्चा खुश और संतुष्ट महसूस कर रहा है! यह जुड़ने, अनुभव साझा करने और उनकी खुशी का एक साथ जश्न मनाने का अच्छा समय है।' 
  },

  // Guidance
  'guidance.listen': { en: 'Listen more than you advise today', hi: 'आज सलाह देने से ज़्यादा सुनें' },
  'guidance.compare': { en: 'Avoid comparisons with others', hi: 'दूसरों से तुलना न करें' },
  'guidance.calm': { en: 'A calm conversation will help', hi: 'शांत बातचीत मदद करेगी' },
  'guidance.space': { en: 'Give them some space if needed', hi: 'अगर जरूरत हो तो उन्हें थोड़ी जगह दें' },
  'guidance.celebrate': { en: 'Celebrate this moment together', hi: 'इस पल को एक साथ मनाएं' },
  'guidance.share': { en: 'Share your own happy memories', hi: 'अपनी खुशी की यादें साझा करें' },

  // Privacy
  'privacy.note': { en: 'No spying. No judgement. No raw messages shared.', hi: 'कोई जासूसी नहीं। कोई आलोचना नहीं। कोई सीधा संदेश साझा नहीं।' },
  'privacy.support': { en: 'This app supports understanding, not monitoring.', hi: 'यह ऐप समझ का समर्थन करता है, निगरानी का नहीं।' },

  // About
  'about.title': { en: 'About Parent–Teen Bridge', hi: 'पैरेंट-टीन ब्रिज के बारे में' },
  'about.description': { en: 'Built for GDG Hackathon – Social Impact & Mental Health. This tool aims to foster better communication between parents and teenagers through empathy and understanding.', hi: 'GDG हैकाथॉन के लिए बनाया गया – सामाजिक प्रभाव और मानसिक स्वास्थ्य। यह उपकरण सहानुभूति और समझ के माध्यम से माता-पिता और किशोरों के बीच बेहतर संवाद को बढ़ावा देने का लक्ष्य रखता है।' },

  // Footer
  'footer.disclaimer': { en: 'This is a support and awareness tool, not a medical or diagnostic application.', hi: 'यह एक सहायता और जागरूकता उपकरण है, चिकित्सा या नैदानिक एप्लिकेशन नहीं।' },

  // Reset
  'reset': { en: 'Start Over', hi: 'फिर से शुरू करें' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
