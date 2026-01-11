import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Lightbulb, RefreshCcw, Shield, MessageCircle, Activity, LogOut, Users, TrendingUp, Clock, Eye } from 'lucide-react';
import { GeminiResponse } from '@/services/gemini';

interface EmotionData {
  emotion: string;
  message: string;
  timestamp: string;
  geminiResponse: GeminiResponse | null;
}

const getEmotionEmoji = (emotion: string) => {
  switch (emotion) {
    case 'sad': return '😞';
    case 'happy': return '🙂';
    case 'angry': return '😡';
    case 'stressed': return '😰';
    default: return '😐';
  }
};

export default function ParentSection() {
  const navigate = useNavigate();
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<EmotionData | null>(null);

  useEffect(() => {
    // Load emotion data from localStorage
    const storedData = localStorage.getItem('emotionData');
    if (storedData) {
      setEmotionData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    navigate('/dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logout */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Parent Section</h1>
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

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { icon: MessageCircle, label: 'Total Entries', value: emotionData.length, color: 'blue' },
            { icon: TrendingUp, label: 'This Week', value: emotionData.filter(d => {
              const entryDate = new Date(d.timestamp);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return entryDate > weekAgo;
            }).length, color: 'green' },
            { icon: Clock, label: 'Pending Review', value: emotionData.filter(d => !d.geminiResponse).length, color: 'yellow' },
            { icon: Eye, label: 'With Insights', value: emotionData.filter(d => d.geminiResponse).length, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Emotion Entries List */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Child's Emotion Entries</h2>
          </div>
          
          {emotionData.length === 0 ? (
            <div className="p-12 text-center">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No entries yet</h3>
              <p className="text-gray-600">
                When your child shares their feelings, they will appear here with AI-powered insights to help you support them better.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {emotionData.map((entry, index) => (
                <motion.div
                  key={index}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{getEmotionEmoji(entry.emotion)}</span>
                        <div>
                          <span className="font-semibold text-gray-900 capitalize">{entry.emotion}</span>
                          <span className="text-sm text-gray-500 ml-2">{entry.timestamp}</span>
                        </div>
                      </div>
                      
                      {entry.message && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700 italic">"{entry.message}"</p>
                        </div>
                      )}
                      
                      {entry.geminiResponse && (
                        <div className="space-y-3">
                          {/* AI Analysis */}
                          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-blue-900">AI Analysis</span>
                            </div>
                            <p className="text-sm text-gray-800">{entry.geminiResponse.emotionAnalysis}</p>
                          </div>
                          
                          {/* Parent Suggestions */}
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-green-600" />
                              <span className="font-semibold text-green-900">Parent Suggestions</span>
                            </div>
                            <ul className="space-y-1">
                              {entry.geminiResponse.parentSuggestions.map((suggestion, sIndex) => (
                                <li key={sIndex} className="text-sm text-gray-800 flex items-start gap-2">
                                  <span className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center text-green-800 text-xs font-bold mt-0.5">
                                    {sIndex + 1}
                                  </span>
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Conversation Starters */}
                          {entry.geminiResponse.conversationStarters.length > 0 && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <MessageCircle className="w-4 h-4 text-purple-600" />
                                <span className="font-semibold text-purple-900">Conversation Starters</span>
                              </div>
                              <div className="space-y-2">
                                {entry.geminiResponse.conversationStarters.map((starter, sIndex) => (
                                  <div key={sIndex} className="text-sm text-gray-800 italic bg-white p-2 rounded border-l-2 border-purple-200">
                                    "{starter}"
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Helpful Activities */}
                          {entry.geminiResponse.activities.length > 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-4 h-4 text-yellow-600" />
                                <span className="font-semibold text-yellow-900">Helpful Activities</span>
                              </div>
                              <div className="space-y-2">
                                {entry.geminiResponse.activities.map((activity, sIndex) => (
                                  <div key={sIndex} className="text-sm text-gray-800 flex items-start gap-2">
                                    <span className="w-5 h-5 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800 text-xs font-bold mt-0.5">
                                      {sIndex + 1}
                                    </span>
                                    <span>{activity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Back to Dashboard Button */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={handleBackToDashboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-all duration-300"
          >
            <RefreshCcw className="w-4 h-4" />
            Back to Dashboard
          </motion.button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selectedEntry && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedEntry(null)}
        >
          <motion.div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Emotion Details</h3>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getEmotionEmoji(selectedEntry.emotion)}</span>
                <div>
                  <span className="font-semibold text-gray-900 capitalize">{selectedEntry.emotion}</span>
                  <span className="text-sm text-gray-500 block">{selectedEntry.timestamp}</span>
                </div>
              </div>
              
              {selectedEntry.message && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 italic">"{selectedEntry.message}"</p>
                </div>
              )}
              
              {selectedEntry.geminiResponse && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">AI Analysis</h4>
                    <p className="text-gray-800">{selectedEntry.geminiResponse.emotionAnalysis}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Parent Suggestions</h4>
                    <ul className="space-y-2">
                      {selectedEntry.geminiResponse.parentSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-800 text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-gray-800">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
