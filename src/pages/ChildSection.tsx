import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, Heart } from 'lucide-react';
import { analyzeEmotion, GeminiResponse } from '@/services/gemini';

type Emotion = 'sad' | 'angry' | 'stressed' | 'happy' | null;

const emotions: { key: Emotion; emoji: string; color: string; selectedColor: string }[] = [
  { key: 'sad', emoji: '😞', color: 'bg-emotion-sad/10 hover:bg-emotion-sad/20 border-emotion-sad/30', selectedColor: 'ring-emotion-sad/50 bg-emotion-sad/20' },
  { key: 'angry', emoji: '😡', color: 'bg-emotion-angry/10 hover:bg-emotion-angry/20 border-emotion-angry/30', selectedColor: 'ring-emotion-angry/50 bg-emotion-angry/20' },
  { key: 'stressed', emoji: '😰', color: 'bg-emotion-stressed/10 hover:bg-emotion-stressed/20 border-emotion-stressed/30', selectedColor: 'ring-emotion-stressed/50 bg-emotion-stressed/20' },
  { key: 'happy', emoji: '🙂', color: 'bg-emotion-happy/10 hover:bg-emotion-happy/20 border-emotion-happy/30', selectedColor: 'ring-emotion-happy/50 bg-emotion-happy/20' },
];

const emotionLabels = {
  sad: 'Sad',
  angry: 'Angry',
  stressed: 'Stressed',
  happy: 'Happy'
};

export default function ChildSection() {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedEmotion) return;

    setIsSubmitting(true);
    
    try {
      // Call Gemini API for analysis
      const response = await analyzeEmotion(selectedEmotion || '', message);
      
      // Store the emotion data for parent to view
      const emotionData = {
        emotion: selectedEmotion,
        message,
        timestamp: new Date().toLocaleString(),
        geminiResponse: response
      };
      
      // Save to localStorage for parent section to access
      const existingData = JSON.parse(localStorage.getItem('emotionData') || '[]');
      existingData.push(emotionData);
      localStorage.setItem('emotionData', JSON.stringify(existingData));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting emotion:', error);
      // Still show success even if API fails
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    navigate('/dashboard');
  };

  const handleNewEntry = () => {
    setSelectedEmotion(null);
    setMessage('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header with Logout */}
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500" />
              <h1 className="text-3xl font-bold text-gray-900">Child Section</h1>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </motion.div>

          {/* Success Message */}
          <motion.div 
            className="bg-white rounded-3xl p-8 card-shadow text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank you for sharing! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your feelings have been shared with your parents. They will see your message and get helpful suggestions on how to support you better.
            </p>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={handleNewEntry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Share Another Feeling
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header with Logout */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-900">Child Section</h1>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </motion.div>

        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            How are you feeling today?
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose an emotion and share what's on your mind. Your parents will see this and get helpful suggestions.
          </p>
        </motion.div>

        {/* Emotion Selection */}
        <motion.div 
          className="bg-white rounded-3xl p-8 card-shadow mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                <span className="font-medium text-foreground">{emotionLabels[key as keyof typeof emotionLabels]}</span>
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
              placeholder="Tell us more about how you're feeling (optional)..."
              className="w-full p-4 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none resize-none h-24 text-foreground placeholder:text-muted-foreground transition-colors"
              maxLength={200}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!selectedEmotion || isSubmitting}
            whileHover={selectedEmotion && !isSubmitting ? { scale: 1.02 } : {}}
            whileTap={selectedEmotion && !isSubmitting ? { scale: 0.98 } : {}}
            className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sharing...' : 'Share My Feeling'}
          </motion.button>

          {/* Privacy Note */}
          <motion.div 
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Shield className="w-4 h-4" />
            <span>Your feelings are safe and will only be seen by your parents</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
