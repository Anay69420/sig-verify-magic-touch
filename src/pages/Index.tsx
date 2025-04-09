
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileSignature, ShieldCheck, Upload } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 wave-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        <div className="mb-8">
          <h1 className="greeting-text mb-4">Signature Validator</h1>
          <p className="text-lg text-muted-foreground">
            Verify the authenticity of signatures with advanced AI technology
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Upload className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Upload</h3>
            <p className="text-sm text-muted-foreground">
              Upload your signature image in JPEG or PNG format
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <FileSignature className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Analyze</h3>
            <p className="text-sm text-muted-foreground">
              Our AI model analyzes the signature for authentication
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Verify</h3>
            <p className="text-sm text-muted-foreground">
              Get instant results with confidence scores
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            onClick={() => navigate('/upload')}
            className="font-medium"
          >
            Start Verification
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
