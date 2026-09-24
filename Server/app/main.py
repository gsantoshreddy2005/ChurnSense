from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

from app.schemas import CustomerData

app = FastAPI(title="ChurnSense API")

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("../model/churn_model.pkl")

@app.get("/")
def root():
    return {"message": "ChurnSense API is running"} 

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(customer: CustomerData):

    data = customer.model_dump(by_alias=True)
    input_data = pd.DataFrame([data])

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0][1] 

    return {
        "prediction": prediction,
        "churn_probability": float(probability)
    }