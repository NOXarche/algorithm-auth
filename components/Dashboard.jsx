import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Settings, Book, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              AlgoRhythm Dashboard
            </motion.h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-purple-400"
                />
                <div>
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-gray-300 text-sm">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Welcome back, {user?.name}!</h2>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Book,
                title: 'Algorithm Library',
                description: 'Explore sorting, searching, and graph algorithms',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: BarChart3,
                title: 'Performance Analytics',
                description: 'Track your learning progress and achievements',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Settings,
                title: 'Customization',
                description: 'Personalize your learning environment',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: User,
                title: 'Profile',
                description: 'Manage your account and preferences',
                color: 'from-pink-500 to-pink-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Success Message */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">🎉 Authentication Successful!</h3>
            <p className="text-gray-300 text-lg">
              You've successfully signed in to AlgoRhythm. This modern authentication system features:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
              <div className="bg-white/5 rounded-lg p-4">
                <strong className="text-purple-400">React 18.2</strong>
                <p className="text-gray-300 mt-1">Latest React with Suspense & Transitions</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <strong className="text-purple-400">3D Graphics</strong>
                <p className="text-gray-300 mt-1">Three.js with React Three Fiber</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <strong className="text-purple-400">Tailwind CSS</strong>
                <p className="text-gray-300 mt-1">Modern styling with glassmorphism</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
