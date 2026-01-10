import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

export function ProcessingSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          {/* Animated Heart */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.4, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 text-primary" />
              </motion.div>
            </div>
          </div>

          {/* Loading Text */}
          <motion.h3 
            className="text-2xl font-heading font-semibold text-foreground mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('processing.title')}
          </motion.h3>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
