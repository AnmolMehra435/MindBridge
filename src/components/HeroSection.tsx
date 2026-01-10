import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Heart, Shield, Users } from 'lucide-react';

export function HeroSection() {
  const { t } = useLanguage();

  const scrollToTeen = () => {
    const element = document.getElementById('teen');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen gradient-hero flex items-center justify-center pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <motion.div 
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-primary" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToTeen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('hero.cta')}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-2xl card-shadow">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{t('privacy.note')}</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-2xl card-shadow">
              <Heart className="w-8 h-8 text-accent-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Built with empathy</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-2xl card-shadow">
              <Users className="w-8 h-8 text-success" />
              <span className="text-sm font-medium text-muted-foreground">{t('privacy.support')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
