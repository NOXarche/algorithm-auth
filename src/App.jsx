import React, { Suspense, useState, useTransition } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isPending, startTransition] = useTransition();

  const handlePageTransition = (page) => {
    startTransition(() => {
      console.log(`Transitioning to: ${page}`);
    });
  };

  return (
    <AuthProvider>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Router>
            <Routes>
              <Route 
                path="/" 
                element={
                  <AuthPage 
                    onTransition={handlePageTransition}
                    isPending={isPending}
                  />
                } 
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
