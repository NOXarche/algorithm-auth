import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import FloatingCubes from './FloatingCubes';
import ParticleBackground from './ParticleBackground';
import SocialAuthButtons from './SocialAuthButtons';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ onTransition, isPending }) => {
  const [isSignup, setIsSignup] = useState(false);
  const containerRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      onTransition?.('dashboard');
    }
  }, [user, onTransition]);

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Three.js 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <FloatingCubes />
          <Sphere args={[1, 100, 200]} position={[-5, 0, 0]}>
            <MeshDistortMaterial
              color="#8B5CF6"
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0}
            />
          </Sphere>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Auth Container */}
      <motion.div 
        ref={containerRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <motion.div 
            className="text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                AlgoRhythm
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Experience the future of algorithm learning with immersive 3D visualizations
              </motion.p>
            </div>
            
            {/* Animated Features */}
            <div className="space-y-4">
              {['Interactive Learning', '3D Visualizations', 'Real-time Collaboration'].map((feature, index) => (
                <motion.div 
                  key={feature}
                  className="flex items-center space-x-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glassmorphism rounded-3xl p-8 shadow-2xl">
              {/* Form Header */}
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-3xl font-bold text-white mb-2"
                  key={isSignup ? 'signup' : 'login'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isSignup ? 'Create Account' : 'Welcome Back'}
                </motion.h2>
                <motion.p 
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {isSignup 
                    ? 'Join thousands of developers learning algorithms' 
                    : 'Continue your algorithm journey'
                  }
                </motion.p>
              </div>

              {/* Social Auth */}
              <SocialAuthButtons />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Auth Form */}
              <motion.div
                key={isSignup ? 'signup-form' : 'login-form'}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.5 }}
              >
                {isSignup ? (
                  <SignupForm onTransition={onTransition} />
                ) : (
                  <LoginForm onTransition={onTransition} />
                )}
              </motion.div>

              {/* Form Switch */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleFormSwitch}
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  {isSignup 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"
                  }
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
