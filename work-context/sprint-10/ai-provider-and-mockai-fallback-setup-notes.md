# AI Provider and MockAI Fallback Setup Notes

This document provides instructions for configuring the AI Provider (Google Vertex AI / Gemini) and the MockAI fallback mechanism for local development and testing in the PharmaAssist application.

## Overview

PharmaAssist utilizes a large language model (LLM) to power the "AI Copilot" features (e.g., explaining drug interactions). The production application is designed to use Google Vertex AI (Gemini).

To allow development without requiring real AI credentials or incurring costs, a `MockAIService` is provided as a fallback.

## 1. Using MockAI (Local Development)

By default, or if the Google AI configuration is missing, the backend will automatically fall back to the `MockAIService`.

The `MockAIService` returns hardcoded, simulated AI responses based on keywords in the prompt. This allows frontend developers to build and test UI components (like the Copilot Sidebar) without needing a real AI connection.

**To explicitly force MockAI:**
Ensure that your `backend/.env` file does **NOT** have valid `GOOGLE_AI_PROJECT_ID` or `GOOGLE_AI_LOCATION` values, or simply leave them empty/commented out.

## 2. Using Google Vertex AI (Production / Staging / Full Testing)

To enable the real AI provider, you must configure the following environment variables in the `backend/.env` file:

```env
# Enable the real AI Provider
USE_MOCK_AI=false # Optional flag if implemented, otherwise presence of credentials determines it.

# Google Cloud Platform configuration
GOOGLE_AI_PROJECT_ID="your-gcp-project-id"
GOOGLE_AI_LOCATION="us-central1" # Or your deployed region
GOOGLE_AI_MODEL="gemini-1.5-pro-preview-0409" # The specific model version to use
```

### Authentication for Google Vertex AI

The backend uses the official `@google-cloud/vertexai` SDK, which relies on Google Application Default Credentials (ADC).

#### For Local Testing with Real AI:
1. Install the [Google Cloud CLI (`gcloud`)](https://cloud.google.com/sdk/docs/install).
2. Initialize and login:
   ```bash
   gcloud auth application-default login
   ```
3. This creates a credentials file on your local machine that the Node.js backend will automatically discover.
4. Set your GCP project:
   ```bash
   gcloud config set project your-gcp-project-id
   ```

#### For Production (e.g., deployed on a server or Docker container):
You must provide a Service Account JSON key.
1. Create a Service Account in GCP with the "Vertex AI User" role.
2. Generate a JSON key.
3. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to the path of that JSON file:
   ```env
   GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
   ```

## 3. Verifying the AI Connection

You can verify which AI service is active by checking the backend startup logs.
- If using MockAI, you will see a warning message indicating that the `MockAIService` has been initialized due to missing credentials.
- If using Vertex AI, the `VertexAIService` will initialize successfully.
