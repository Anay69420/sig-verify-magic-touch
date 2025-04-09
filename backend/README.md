
# Signature Verification Backend

This folder contains the backend implementation for the Signature Verification Web App.

## Project Structure (To be implemented)

- `model_training.py`: Script for training the ML model on the signature dataset
- `app.py`: Flask/FastAPI application for serving the model inference API
- `requirements.txt`: Python dependencies
- `models/`: Directory to store trained models
- `dataset_preview.py`: Script to load and serve sample images from the dataset

## Dataset Information

The signature dataset is stored at a fixed path:
```
/content/drive/MyDrive/signatures/
```

With the following structure:
```
signatures/
├── original/   # Contains original signature samples
└── forged/     # Contains forged signature samples
```

The dataset is automatically loaded for both training and preview without requiring any user input.

## Implementation Plan

1. **Model Training Script**
   - Load signature dataset from fixed path
   - Preprocess images (resizing, normalization)
   - Build CNN/ResNet model with PyTorch
   - Train model with original/forged signature classes
   - Save trained model weights

2. **Inference API**
   - Flask/FastAPI endpoint to accept uploaded images
   - Preprocess incoming images
   - Load trained model and make predictions
   - Return prediction result and confidence score

3. **Dataset Preview API**
   - Endpoint to fetch random samples from both original and forged datasets
   - No authentication required as this is a demo feature
   - Returns base64-encoded images or URLs to static files

## Getting Started (Coming Soon)

Instructions for setting up and running the backend will be provided here.

