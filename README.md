# ChurnSense 📊

**ChurnSense** is a full-stack Machine Learning application designed to predict customer churn risk for subscription and telecom services. By analyzing 40+ subscriber telemetry, billing, demographic, and engagement features, ChurnSense computes real-time churn probabilities and outputs clear risk classification scores.

---

## 🌟 Key Features

* **Machine Learning Pipeline**: Trained classification model (`Scikit-Learn`, `Pandas`, `Joblib`) evaluating multi-variable subscriber telemetry.
* **FastAPI Backend**: Asynchronous Python REST API providing real-time inference endpoints with Pydantic validation schemas.
* **Minimalist React Frontend**: Clean, responsive UI built with **React 19** and **Vite**, featuring structured input sections and sample profile presets.
* **Offline Resiliency**: Built-in intelligent client fallback engine ensuring smooth demo execution even if the backend service is offline.
* **Clean Architecture**: Decoupled repository layout separating ML model training, API server, and web client.

---

## 📁 Repository Structure

```text
ChurnSense/
├── Model/                      # Machine Learning notebook & artifacts
│   ├── churn_model.pkl         # Trained model binary
│   ├── training.ipynb          # Jupyter notebook for EDA & training
│   └── datasets/               # Training datasets
├── Server/                     # FastAPI backend application
│   ├── app/
│   │   ├── main.py             # FastAPI entrypoint & CORS middleware
│   │   └── schemas.py          # Pydantic input schemas (40+ features)
│   └── requirements.txt        # Python dependencies
├── client/                     # Vite + React frontend application
│   ├── src/
│   │   ├── components/         # UI components (NavBar, PredictionForm, ResultCard)
│   │   ├── pages/              # App views (Home landing page, Predict tool page)
│   │   ├── App.jsx             # React router configuration
│   │   ├── main.jsx            # React root DOM renderer
│   │   └── index.css           # Global minimal CSS design system
│   ├── package.json            # Node.js dependencies
│   └── vite.config.js          # Vite build configuration
└── README.md                   # Documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites

* **Node.js** (v18+ recommended)
* **Python** (v3.9+ recommended)

---

### 1. Running the FastAPI Backend Server

1. Navigate to the `Server` directory:
   ```bash
   cd Server
   ```

2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   The backend server will be running at `http://127.0.0.1:8000`.

---

### 2. Running the React Frontend Client

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

   The web interface will be accessible at `http://localhost:5173`.

---

## 📡 API Endpoints

### Health Check
* `GET /health`
  ```json
  { "status": "ok" }
  ```

### Churn Prediction Endpoint
* `POST /predict`
  * **Headers**: `Content-Type: application/json`
  * **Sample Payload**:
    ```json
    {
      "Gender": "Male",
      "Age": 45,
      "Under 30": "No",
      "Senior Citizen": "No",
      "Married": "No",
      "Dependents": "No",
      "Number of Dependents": 0,
      "Latitude": 34.0522,
      "Longitude": -118.2437,
      "Population": 3800000,
      "Quarter": "Q3",
      "Referred a Friend": "No",
      "Number of Referrals": 0,
      "Tenure in Months": 4,
      "Offer": "Offer E",
      "Phone Service": "Yes",
      "Avg Monthly Long Distance Charges": 25.4,
      "Multiple Lines": "Yes",
      "Internet Service": "Yes",
      "Internet Type": "Fiber Optic",
      "Avg Monthly GB Download": 45,
      "Online Security": "No",
      "Online Backup": "No",
      "Device Protection Plan": "No",
      "Premium Tech Support": "No",
      "Streaming TV": "Yes",
      "Streaming Movies": "Yes",
      "Streaming Music": "Yes",
      "Unlimited Data": "Yes",
      "Contract": "Month-to-Month",
      "Paperless Billing": "Yes",
      "Payment Method": "Electronic Check",
      "Monthly Charge": 105.5,
      "Total Charges": 422.0,
      "Total Refunds": 0,
      "Total Extra Data Charges": 0,
      "Total Long Distance Charges": 101.6,
      "Total Revenue": 523.6,
      "Satisfaction Score": 1,
      "CLTV": 2800
    }
    ```
  * **Response Format**:
    ```json
    {
      "prediction": "Yes",
      "churn_probability": 0.865
    }
    ```

---

## 🔒 Security Audit & Public Repository Verification

* **No Hardcoded API Keys or Secrets**: The codebase contains no credentials, access tokens, DB strings, or secret keys.
* **Environment Files**: `.env` is listed in `.gitignore`.
* **Model Artifacts**: The trained model binary (`Model/churn_model.pkl`) is committed so reviewers can clone and run inference immediately out-of-the-box.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
