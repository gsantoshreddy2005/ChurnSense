import { useState } from "react";
import ResultCard from "./ResultCard";

export default function PredictionFo
rm() {
  const [formData, setFormData] = useState({
    Gender: "",
    Age: "",
    "Under 30": "",
    "Senior Citizen": "",
    Married: "",
    Dependents: "",
    "Number of Dependents": "",
    Latitude: "",
    Longitude: "",
    Population: "",
    Quarter: "",
    "Referred a Friend": "",
    "Number of Referrals": "",
    "Tenure in Months": "",
    Offer: "",
    "Phone Service": "",
    "Avg Monthly Long Distance Charges": "",
    "Multiple Lines": "",
    "Internet Service": "",
    "Internet Type": "",
    "Avg Monthly GB Download": "",
    "Online Security": "",
    "Online Backup": "",
    "Device Protection Plan": "",
    "Premium Tech Support": "",
    "Streaming TV": "",
    "Streaming Movies": "",
    "Streaming Music": "",
    "Unlimited Data": "",
    Contract: "",
    "Paperless Billing": "",
    "Payment Method": "",
    "Monthly Charge": "",
    "Total Charges": "",
    "Total Refunds": "",
    "Total Extra Data Charges": "",
    "Total Long Distance Charges": "",
    "Total Revenue": "",
    "Satisfaction Score": "",
    CLTV: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setPrediction(null);

    const numericFields = [
      "Age",
      "Number of Dependents",
      "Latitude",
      "Longitude",
      "Population",
      "Number of Referrals",
      "Tenure in Months",
      "Avg Monthly Long Distance Charges",
      "Avg Monthly GB Download",
      "Monthly Charge",
      "Total Charges",
      "Total Refunds",
      "Total Extra Data Charges",
      "Total Long Distance Charges",
      "Total Revenue",
      "Satisfaction Score",
      "CLTV",
    ];

    const requestData = { ...formData };

    numericFields.forEach((field) => {
      requestData[field] = Number(requestData[field]);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      setPrediction(data);
    } catch (err) {
      setError("Unable to connect to the ChurnSense API.");
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

        {/* Customer Information */}

        <h2>Customer Information</h2>

        <select
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          required
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="number"
          name="Age"
          placeholder="Age"
          value={formData.Age}
          onChange={handleChange}
          required
        />

        <select
          name="Under 30"
          value={formData["Under 30"]}
          onChange={handleChange}
          required
        >
          <option value="">Under 30?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          name="Senior Citizen"
          value={formData["Senior Citizen"]}
          onChange={handleChange}
          required
        >
          <option value="">Senior Citizen?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          name="Married"
          value={formData.Married}
          onChange={handleChange}
          required
        >
          <option value="">Married?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          name="Dependents"
          value={formData.Dependents}
          onChange={handleChange}
          required
        >
          <option value="">Dependents?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input
          type="number"
          name="Number of Dependents"
          placeholder="Number of Dependents"
          value={formData["Number of Dependents"]}
          onChange={handleChange}
          required
        />

        {/* Location & Engagement */}

        <h2>Location & Engagement</h2>

        <input
          type="number"
          step="any"
          name="Latitude"
          placeholder="Latitude"
          value={formData.Latitude}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="any"
          name="Longitude"
          placeholder="Longitude"
          value={formData.Longitude}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="Population"
          placeholder="Population"
          value={formData.Population}
          onChange={handleChange}
          required
        />

        <select
          name="Quarter"
          value={formData.Quarter}
          onChange={handleChange}
          required
        >
          <option value="">Quarter</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>

        <select
          name="Referred a Friend"
          value={formData["Referred a Friend"]}
          onChange={handleChange}
          required
        >
          <option value="">Referred a Friend?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input
          type="number"
          name="Number of Referrals"
          placeholder="Number of Referrals"
          value={formData["Number of Referrals"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="Tenure in Months"
          placeholder="Tenure in Months"
          value={formData["Tenure in Months"]}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="Offer"
          placeholder="Offer"
          value={formData.Offer}
          onChange={handleChange}
          required
        />

        {/* Services */}

        <h2>Services</h2>

        <select
          name="Phone Service"
          value={formData["Phone Service"]}
          onChange={handleChange}
          required
        >
          <option value="">Phone Service</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input
          type="number"
          step="any"
          name="Avg Monthly Long Distance Charges"
          placeholder="Avg Monthly Long Distance Charges"
          value={formData["Avg Monthly Long Distance Charges"]}
          onChange={handleChange}
          required
        />

        <select
          name="Multiple Lines"
          value={formData["Multiple Lines"]}
          onChange={handleChange}
          required
        >
          <option value="">Multiple Lines</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No phone service">No phone service</option>
        </select>

        <select
          name="Internet Service"
          value={formData["Internet Service"]}
          onChange={handleChange}
          required
        >
          <option value="">Internet Service</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input
          type="text"
          name="Internet Type"
          placeholder="Internet Type"
          value={formData["Internet Type"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="Avg Monthly GB Download"
          placeholder="Avg Monthly GB Download"
          value={formData["Avg Monthly GB Download"]}
          onChange={handleChange}
          required
        />

        <select
          name="Online Security"
          value={formData["Online Security"]}
          onChange={handleChange}
          required
        >
          <option value="">Online Security</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        <select
          name="Online Backup"
          value={formData["Online Backup"]}
          onChange={handleChange}
          required
        >
          <option value="">Online Backup</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        <select
          name="Device Protection Plan"
          value={formData["Device Protection Plan"]}
          onChange={handleChange}
          required
        >
          <option value="">Device Protection Plan</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        <select
          name="Premium Tech Support"
          value={formData["Premium Tech Support"]}
          onChange={handleChange}
          required
        >
          <option value="">Premium Tech Support</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        <select
          name="Streaming TV"
          value={formData["Streaming TV"]}
          onChange={handleChange}
          required
        >
          <option value="">Streaming TV</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        <select
          name="Streaming Movies"
          value={formData["Streaming Movies"]}
          onChange={handleChange}
          required
        >
          <option value="">Streaming Movies</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        <select
          name="Streaming Music"
          value={formData["Streaming Music"]}
          onChange={handleChange}
          required
        >
          <option value="">Streaming Music</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        <select
          name="Unlimited Data"
          value={formData["Unlimited Data"]}
          onChange={handleChange}
          required
        >
          <option value="">Unlimited Data</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="No internet service">No internet service</option>
        </select>

        {/* Contract & Billing */}

        <h2>Contract & Billing</h2>

        <select
          name="Contract"
          value={formData.Contract}
          onChange={handleChange}
          required
        >
          <option value="">Contract</option>
          <option value="Month-to-Month">Month-to-Month</option>
          <option value="One Year">One Year</option>
          <option value="Two Year">Two Year</option>
        </select>

        <select
          name="Paperless Billing"
          value={formData["Paperless Billing"]}
          onChange={handleChange}
          required
        >
          <option value="">Paperless Billing</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input
          type="text"
          name="Payment Method"
          placeholder="Payment Method"
          value={formData["Payment Method"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="any"
          name="Monthly Charge"
          placeholder="Monthly Charge"
          value={formData["Monthly Charge"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="any"
          name="Total Charges"
          placeholder="Total Charges"
          value={formData["Total Charges"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="any"
          name="Total Refunds"
          placeholder="Total Refunds"
          value={formData["Total Refunds"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="Total Extra Data Charges"
          placeholder="Total Extra Data Charges"
          value={formData["Total Extra Data Charges"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="any"
          name="Total Long Distance Charges"
          placeholder="Total Long Distance Charges"
          value={formData["Total Long Distance Charges"]}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="any"
          name="Total Revenue"
          placeholder="Total Revenue"
          value={formData["Total Revenue"]}
          onChange={handleChange}
          required
        />

        {/* Customer Metrics */}

        <h2>Customer Metrics</h2>

        <input
          type="number"
          name="Satisfaction Score"
          placeholder="Satisfaction Score"
          value={formData["Satisfaction Score"]}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />

        <input
          type="number"
          step="any"
          name="CLTV"
          placeholder="CLTV"
          value={formData.CLTV}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Predict Churn
        </button>
      </form>

      {error && <p>{error}</p>}

      {prediction !== null && (
        <ResultCard prediction={prediction} />
      )}
    </>
  );
}

