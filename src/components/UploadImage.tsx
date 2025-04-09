
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileUp, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DatasetPreview from './DatasetPreview';

const UploadImage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      toast.error('Please select a JPEG or PNG image');
      return;
    }

    setIsLoading(true);
    
    // Mock API call for now - will be replaced with actual backend call
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store the image in sessionStorage for the result page
        if (typeof reader.result === 'string') {
          sessionStorage.setItem('uploadedImage', reader.result);
          
          // Simulate backend response
          const mockResult = {
            isOriginal: Math.random() > 0.5, // Random result for demo
            confidence: (Math.random() * 20 + 80).toFixed(1) // Random confidence between 80-100%
          };
          
          sessionStorage.setItem('result', JSON.stringify(mockResult));
          
          setIsLoading(false);
          navigate('/result');
        }
      };
      reader.readAsDataURL(file);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 wave-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="upload-container"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Upload your signature for verification
        </h1>
        
        <div
          className={`drop-zone ${isDragging ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
              <p className="text-muted-foreground">Analyzing signature...</p>
            </div>
          ) : (
            <>
              <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drag & Drop your signature image here</p>
              <p className="text-sm text-muted-foreground mb-6">or</p>
              <Button 
                onClick={handleButtonClick}
                size="lg"
                className="mx-auto flex items-center gap-2"
              >
                <FileUp size={18} />
                Upload Your Signature
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept="image/jpeg, image/png"
                className="hidden"
              />
            </>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 text-center flex items-center justify-center gap-2">
          <Image size={16} />
          Only JPEG/PNG images allowed
        </p>
      </motion.div>
      
      {/* Always show the DatasetPreview component */}
      <div className="mt-10 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Dataset Preview</h2>
        <DatasetPreview alwaysShow={true} />
      </div>
    </div>
  );
};

export default UploadImage;
