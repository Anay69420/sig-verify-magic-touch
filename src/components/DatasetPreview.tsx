
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Fingerprint, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample dataset images (hardcoded paths)
// In a real implementation, these would come from your backend API
const sampleData = {
  original: [
    '/samples/original/sample1.png',
    '/samples/original/sample2.png',
    '/samples/original/sample3.png',
  ],
  forged: [
    '/samples/forged/sample1.png',
    '/samples/forged/sample2.png',
    '/samples/forged/sample3.png',
  ]
};

// For demo purposes, we'll use placeholder images since we don't have the actual dataset files
const placeholderImages = {
  original: [
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2348BB78%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EOriginal%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2348BB78%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EOriginal%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2348BB78%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EOriginal%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
  ],
  forged: [
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%23F56565%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EForged%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%23F56565%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EForged%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%23F56565%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EForged%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
  ]
};

const DatasetPreview = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [previewData, setPreviewData] = useState<{
    original: string[];
    forged: string[];
  }>({ original: [], forged: [] });

  useEffect(() => {
    // In a real implementation, this would fetch from your backend
    // For now, we'll simulate loading with a timeout
    const timer = setTimeout(() => {
      setPreviewData({
        original: placeholderImages.original,
        forged: placeholderImages.forged
      });
      setDataLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };

  return (
    <div className="mt-10 w-full max-w-3xl mx-auto">
      <Button 
        onClick={togglePreview} 
        variant="outline" 
        className="mb-4 w-full flex items-center justify-center gap-2"
      >
        {showPreview ? 'Hide Dataset Preview' : 'Show Dataset Preview'}
        <ImageIcon size={16} />
      </Button>

      {showPreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border border-border p-4 bg-background/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Fingerprint className="text-primary" size={20} />
            Dataset Preview
          </h3>

          {!dataLoaded ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-2 text-green-600 flex items-center gap-1">
                  Original Signatures
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {previewData.original.map((src, index) => (
                    <div key={`original-${index}`} className="border rounded-md p-2 bg-white">
                      <img 
                        src={src} 
                        alt={`Original signature sample ${index + 1}`} 
                        className="w-full h-auto object-contain"
                      />
                      <p className="text-xs text-center mt-1 text-muted-foreground">
                        Sample {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium mb-2 text-red-600 flex items-center gap-1">
                  Forged Signatures
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {previewData.forged.map((src, index) => (
                    <div key={`forged-${index}`} className="border rounded-md p-2 bg-white">
                      <img 
                        src={src} 
                        alt={`Forged signature sample ${index + 1}`} 
                        className="w-full h-auto object-contain"
                      />
                      <p className="text-xs text-center mt-1 text-muted-foreground">
                        Sample {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-200">
            <p className="text-sm flex items-start gap-2 text-amber-800">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <span>
                This is a preview of the dataset used for training the model. The model is trained on a fixed dataset path 
                (e.g., <code className="bg-amber-100 px-1 rounded">/content/drive/MyDrive/signatures</code>) with both original and forged signature samples.
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DatasetPreview;
