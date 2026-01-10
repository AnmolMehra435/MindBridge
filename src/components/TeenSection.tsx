import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

export type Emotion = 'sad' | 'angry' | 'stressed' | 'happy' | null;

interface TeenSectionProps {
  onSubmit: (emotion: Emotion, message: string) => void;
}

const emotions: { key: Emotion; emoji: string; color: string; selectedColor: string }[] = [
  { key: 'sad', emoji: '😞', color: 'bg-emotion-sad/10 hover:bg-emotion-sad/20 border-emotion-sad/30', selectedColor: 'ring-emotion-sad/50 bg-emotion-sad/20' },
  { key: 'angry', emoji: '😡', color: 'bg-emotion-angry/10 hover:bg-emotion-angry/20 border-emotion-angry/30', selectedColor: 'ring-emotion-angry/50 bg-emotion-angry/20' },
  { key: 'stressed', emoji: '😰', color: 'bg-emotion-stressed/10 hover:bg-emotion-stressed/20 border-emotion-stressed/30', selectedColor: 'ring-emotion-stressed/50 bg-emotion-stressed/20' },
  { key: 'happy', emoji: '🙂', color: 'bg-emotion-happy/10 hover:bg-emotion-happy/20 border-emotion-happy/30', selectedColor: 'ring-emotion-happy/50 bg-emotion-happy/20' },
];

export function TeenSection({ onSubmit }: TeenSectionProps) {
  const { t } = useLanguage();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (selectedEmotion) {
      onSubmit(selectedEmotion, message);
    }
  };

  return (
    <section id="teen" className="py-20 gradient-teen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('teen.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('teen.subtitle')}
            </p>
          </motion.div>

          {/* Emotion Selection */}
          <motion.div 
            className="bg-card rounded-3xl p-8 card-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {emotions.map(({ key, emoji, color, selectedColor }, index) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedEmotion(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedEmotion === key
                      ? `ring-4 ${selectedColor} shadow-lg`
                      : color
                  }`}
                >
                  <span className="text-5xl">{emoji}</span>
                  <span className="font-medium text-foreground">{t(`emotion.${key}`)}</span>
                </motion.button>
              ))}
            </div>

            {/* Optional Message */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('teen.optional')}
                className="w-full p-4 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none resize-none h-24 text-foreground placeholder:text-muted-foreground transition-colors"
                maxLength={200}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!selectedEmotion}
              whileHover={selectedEmotion ? { scale: 1.02 } : {}}
              whileTap={selectedEmotion ? { scale: 0.98 } : {}}
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('teen.submit')}
            </motion.button>

            {/* Privacy Note */}
            <motion.div 
              className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Shield className="w-4 h-4" />
              <span>{t('teen.note')}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
