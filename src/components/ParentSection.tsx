import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Emotion } from './TeenSection';
import { Heart, Lightbulb, RefreshCcw, Shield } from 'lucide-react';

interface ParentSectionProps {
  emotion: Emotion;
  onReset: () => void;
}

const guidanceMap: Record<string, string[]> = {
  sad: ['guidance.listen', 'guidance.compare', 'guidance.calm'],
  angry: ['guidance.listen', 'guidance.space', 'guidance.calm'],
  stressed: ['guidance.listen', 'guidance.compare', 'guidance.calm'],
  happy: ['guidance.celebrate', 'guidance.share', 'guidance.listen'],
};

const emojiMap: Record<string, string> = {
  sad: '😞',
  angry: '😡',
  stressed: '😰',
  happy: '🙂',
};

export function ParentSection({ emotion, onReset }: ParentSectionProps) {
  const { t } = useLanguage();

  if (!emotion) return null;

  const guidance = guidanceMap[emotion] || [];

  return (
    <section id="parent" className="py-20 gradient-parent">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Main Message Card */}
          <motion.div 
            className="bg-card rounded-3xl p-8 card-shadow mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Heart className="w-6 h-6 text-primary" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {t('parent.title')}
              </h2>
            </div>

            {/* Emotion Indicator */}
            <motion.div 
              className="flex items-center gap-4 mb-6 p-4 bg-muted rounded-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-4xl">{emojiMap[emotion]}</span>
              <span className="font-medium text-lg text-foreground capitalize">
                {t(`emotion.${emotion}`)}
              </span>
            </motion.div>

            {/* Translated Message */}
            <motion.div 
              className="p-6 bg-accent/30 rounded-2xl border-l-4 border-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg text-foreground leading-relaxed">
                {t(`message.${emotion}`)}
              </p>
            </motion.div>
          </motion.div>

          {/* Guidance Card */}
          <motion.div 
            className="bg-card rounded-3xl p-8 card-shadow mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <Lightbulb className="w-6 h-6 text-success" />
              </motion.div>
              <h3 className="text-xl font-heading font-semibold text-foreground">
                {t('parent.guidance')}
              </h3>
            </div>

            <ul className="space-y-4">
              {guidance.map((key, index) => (
                <motion.li
                  key={key}
                  className="flex items-center gap-4 p-4 bg-success/5 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success font-bold">
                    {index + 1}
                  </span>
                  <span className="text-foreground font-medium">{t(key)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Privacy Reminder */}
          <motion.div 
            className="bg-card rounded-2xl p-6 card-shadow mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Shield className="w-5 h-5" />
              <p className="text-sm">{t('privacy.note')} {t('privacy.support')}</p>
            </div>
          </motion.div>

          {/* Reset Button */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-all duration-300"
            >
              <RefreshCcw className="w-4 h-4" />
              {t('reset')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
