import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Emotion } from './TeenSection';
import { GeminiResponse } from '@/services/gemini';
import { Heart, Lightbulb, RefreshCcw, Shield, MessageCircle, Activity } from 'lucide-react';

interface ParentSectionProps {
  emotion: Emotion;
  childMessage: string;
  geminiResponse: GeminiResponse | null;
  onReset: () => void;
}


const emojiMap: Record<string, string> = {
  sad: '😞',
  angry: '😡',
  stressed: '😰',
  happy: '🙂',
};

export function ParentSection({ emotion, childMessage, geminiResponse, onReset }: ParentSectionProps) {
  const { t } = useLanguage();

  if (!emotion) return null;


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

            {/* Child's Message */}
            {childMessage && (
              <motion.div 
                className="mb-6 p-4 bg-muted rounded-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Child's message:</span>
                </div>
                <p className="text-foreground italic">"{childMessage}"</p>
              </motion.div>
            )}

            {/* AI Analysis */}
            {geminiResponse?.emotionAnalysis && (
              <motion.div 
                className="p-6 bg-accent/30 rounded-2xl border-l-4 border-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">AI Analysis:</span>
                </div>
                <p className="text-lg text-foreground leading-relaxed">
                  {geminiResponse.emotionAnalysis}
                </p>
              </motion.div>
            )}
          </motion.div>

            {/* AI Suggestions */}
            {geminiResponse?.parentSuggestions && geminiResponse.parentSuggestions.length > 0 && (
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
                    AI-Powered Parent Suggestions
                  </h3>
                </div>

                <ul className="space-y-4">
                  {geminiResponse.parentSuggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-4 p-4 bg-success/5 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success font-bold">
                        {index + 1}
                      </span>
                      <span className="text-foreground font-medium">{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Conversation Starters */}
            {geminiResponse?.conversationStarters && geminiResponse.conversationStarters.length > 0 && (
              <motion.div 
                className="bg-card rounded-3xl p-8 card-shadow mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    Conversation Starters
                  </h3>
                </div>

                <div className="space-y-3">
                  {geminiResponse.conversationStarters.map((starter, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <p className="text-foreground italic">"{starter}"</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Helpful Activities */}
            {geminiResponse?.activities && geminiResponse.activities.length > 0 && (
              <motion.div 
                className="bg-card rounded-3xl p-8 card-shadow mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                  >
                    <Activity className="w-6 h-6 text-warning" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    Helpful Activities
                  </h3>
                </div>

                <div className="grid gap-3">
                  {geminiResponse.activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-warning/5 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center text-warning font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="text-foreground font-medium">{activity}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

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
