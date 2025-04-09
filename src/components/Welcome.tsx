
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const greetings = ["Hello!", "Namaste!", "Welcome to Signature Validator"];

const Welcome = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentGreeting < greetings.length - 1) {
        setCurrentGreeting((prev) => prev + 1);
      } else {
        clearInterval(interval);
        // Navigate to upload page after the last greeting
        setTimeout(() => {
          navigate('/upload');
        }, 2000);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentGreeting, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 wave-bg">
      <motion.div
        key={currentGreeting}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="greeting-text mb-6">{greetings[currentGreeting]}</h1>
        
        {currentGreeting === greetings.length - 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            Verify the authenticity of signatures with AI
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;
