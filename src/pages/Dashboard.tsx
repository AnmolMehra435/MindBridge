import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Database, BarChart3, MessageCircle, Settings, LogOut, Eye, Clock, TrendingUp } from 'lucide-react';

interface MockData {
  id: string;
  childName: string;
  emotion: string;
  message: string;
  timestamp: string;
  status: 'resolved' | 'pending' | 'in-progress';
}

const mockDatabaseData: MockData[] = [
  {
    id: '1',
    childName: 'Emma',
    emotion: 'sad',
    message: 'I miss my friends from school',
    timestamp: '2024-01-11 14:30',
    status: 'resolved'
  },
  {
    id: '2',
    childName: 'Liam',
    emotion: 'stressed',
    message: 'I have too much homework',
    timestamp: '2024-01-11 15:45',
    status: 'in-progress'
  },
  {
    id: '3',
    childName: 'Sophia',
    emotion: 'happy',
    message: 'I won the art competition!',
    timestamp: '2024-01-11 16:20',
    status: 'resolved'
  },
  {
    id: '4',
    childName: 'Noah',
    emotion: 'angry',
    message: 'My brother broke my toy',
    timestamp: '2024-01-11 17:00',
    status: 'pending'
  }
];

function Dashboard() {
  const [showDatabase, setShowDatabase] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'parent' | 'child') => {
    localStorage.setItem('userRole', role);
    if (role === 'parent') {
      navigate('/parent-section');
    } else {
      navigate('/child-section');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case 'sad': return '😞';
      case 'happy': return '🙂';
      case 'angry': return '😡';
      case 'stressed': return '😰';
      default: return '😐';
    }
  };

  if (showDatabase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Database className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">MindBridge Database</h1>
                  <p className="text-gray-600">Real-time emotion tracking and analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Entries</p>
                  <p className="text-2xl font-bold text-gray-900">{mockDatabaseData.length}</p>
                </div>
                <motion.button
                  onClick={() => setShowDatabase(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Dashboard
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { icon: MessageCircle, label: 'Total Messages', value: mockDatabaseData.length, color: 'blue' },
              { icon: TrendingUp, label: 'Resolved', value: mockDatabaseData.filter(d => d.status === 'resolved').length, color: 'green' },
              { icon: Clock, label: 'In Progress', value: mockDatabaseData.filter(d => d.status === 'in-progress').length, color: 'yellow' },
              { icon: Eye, label: 'Pending', value: mockDatabaseData.filter(d => d.status === 'pending').length, color: 'red' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
          </div>

          <motion.div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Entries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emotion</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDatabaseData.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{entry.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold text-sm">
                            {entry.childName[0]}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">{entry.childName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getEmotionEmoji(entry.emotion)}</span>
                          <span className="text-sm text-gray-900 capitalize">{entry.emotion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{entry.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(entry.status)}`}>
                          {entry.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-10 h-10 text-pink-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MindBridge
            </h1>
            <Heart className="w-10 h-10 text-pink-500" />
          </div>
          <p className="text-xl text-gray-600 mb-8">Connecting Hearts, Understanding Emotions</p>
          
          <motion.button
            onClick={() => setShowDatabase(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <Database className="w-5 h-5" />
            View Database Demo
          </motion.button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            onClick={() => handleRoleSelect('parent')}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all duration-300"
          >
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Open as Parent</h2>
              <p className="text-gray-600 mb-6">
                Monitor your child's emotional well-being and receive AI-powered guidance for better communication and support.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AI Insights</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Real-time</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Expert Guidance</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            onClick={() => handleRoleSelect('child')}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer border-2 border-transparent hover:border-pink-200 transition-all duration-300"
          >
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Open as Child</h2>
              <p className="text-gray-600 mb-6">
                Express your feelings safely and help your parents understand what you're going through in a fun, interactive way.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">Safe Space</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Fun & Easy</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Voice Heard</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;