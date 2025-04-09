
// This file will contain the API service for communicating with the backend

interface VerificationResult {
  isOriginal: boolean;
  confidence: string;
}

interface DatasetPreviewResult {
  original: string[];
  forged: string[];
}

export const verifySignature = async (imageFile: File): Promise<VerificationResult> => {
  // This is a placeholder for the actual API call
  // In a real implementation, we would upload the image to the backend
  
  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('signature', imageFile);
  
  try {
    // Uncomment this when backend is ready
    // const response = await fetch('http://your-backend-url/api/verify', {
    //   method: 'POST',
    //   body: formData,
    // });
    
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    
    // return await response.json();
    
    // Mock response for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isOriginal: Math.random() > 0.5,
          confidence: (Math.random() * 20 + 80).toFixed(1)
        });
      }, 2000);
    });
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw error;
  }
};

export const fetchDatasetPreview = async (): Promise<DatasetPreviewResult> => {
  // This is a placeholder for the actual API call
  // In a real implementation, we would fetch dataset samples from the backend
  
  try {
    // Uncomment this when backend is ready
    // const response = await fetch('http://your-backend-url/api/dataset-preview');
    
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    
    // return await response.json();
    
    // Mock response for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          original: [
            // In a real implementation, these would be actual image URLs or base64 data
            'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2348BB78%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EOriginal%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
            'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2348BB78%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EOriginal%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
            'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2348BB78%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EOriginal%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
          ],
          forged: [
            'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%23F56565%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EForged%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
            'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%23F56565%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EForged%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
            'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%23F56565%22%20width%3D%22200%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EForged%20Signature%3C%2Ftext%3E%3C%2Fsvg%3E',
          ]
        });
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching dataset preview:', error);
    throw error;
  }
};
