
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, AlertTriangle } from 'lucide-react';
import { fetchDatasetPreview } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';

interface DatasetPreviewProps {
  alwaysShow?: boolean;
}

const DatasetPreview = ({ alwaysShow = false }: DatasetPreviewProps) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [previewData, setPreviewData] = useState<{
    original: string[];
    forged: string[];
  }>({ original: [], forged: [] });

  useEffect(() => {
    // Fetch dataset preview from the API
    const loadData = async () => {
      try {
        const data = await fetchDatasetPreview();
        setPreviewData(data);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading dataset preview:', error);
      }
    };

    loadData();
  }, []);

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-border p-4 bg-background/50 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Fingerprint className="text-primary" size={20} />
        Dataset Examples
      </h3>

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
                  Original Sample {index + 1}
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
                  Forged Sample {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
  );
};

export default DatasetPreview;
