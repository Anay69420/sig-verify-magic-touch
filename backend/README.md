
# Signature Verification Backend

This folder contains the backend implementation for the Signature Verification Web App.

## Project Structure (To be implemented)

- `model_training.py`: Script for training the ML model on the signature dataset
- `app.py`: Flask/FastAPI application for serving the model inference API
- `requirements.txt`: Python dependencies
- `models/`: Directory to store trained models

## Implementation Plan

1. **Model Training Script**
   - Load signature dataset from Google Drive
   - Preprocess images (resizing, normalization)
   - Build CNN/ResNet model with PyTorch
   - Train model with original/forged signature classes
   - Save trained model weights

2. **Inference API**
   - Flask/FastAPI endpoint to accept uploaded images
   - Preprocess incoming images
   - Load trained model and make predictions
   - Return prediction result and confidence score

## Getting Started (Coming Soon)

Instructions for setting up and running the backend will be provided here.
