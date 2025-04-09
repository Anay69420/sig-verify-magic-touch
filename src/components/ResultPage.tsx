
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, ArrowRight, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VerificationResult {
  isOriginal: boolean;
  confidence: string;
}

const ResultPage = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  
  useEffect(() => {
    // Get data from sessionStorage
    const storedImage = sessionStorage.getItem('uploadedImage');
    const storedResult = sessionStorage.getItem('result');
    
    if (!storedImage || !storedResult) {
      toast.error('No verification result found');
      navigate('/upload');
      return;
    }
    
    setImageUrl(storedImage);
    setResult(JSON.parse(storedResult));
  }, [navigate]);
  
  const handleTryAgain = () => {
    // Clear the session storage
    sessionStorage.removeItem('uploadedImage');
    sessionStorage.removeItem('result');
    
    // Navigate back to upload page
    navigate('/upload');
  };
  
  if (!imageUrl || !result) {
    return null; // Don't render anything until we have the data
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 wave-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`result-card ${result.isOriginal ? 'success' : 'warning'}`}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Verification Result</h1>
          <p className="text-muted-foreground">Our AI has analyzed your signature</p>
        </div>
        
        {imageUrl && (
          <div className="mb-8">
            <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={imageUrl} 
                alt="Uploaded Signature" 
                className="w-full h-auto object-contain bg-gray-50" 
              />
            </div>
          </div>
        )}
        
        <div className="mb-6">
          {result.isOriginal ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <CheckCircle2 className="text-success w-16 h-16 mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-success mb-2">Original Signature</h2>
              <p className="text-muted-foreground">Verified successfully!</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <XCircle className="text-warning w-16 h-16 mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-warning mb-2">Forged Signature</h2>
              <p className="text-muted-foreground">This signature seems suspicious!</p>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center bg-secondary rounded-full px-4 py-2">
            <Percent size={16} className="text-muted-foreground mr-2" />
            <span className="font-medium">Confidence: {result.confidence}%</span>
          </div>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={handleTryAgain}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Try Another
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowRight size={16} />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;
