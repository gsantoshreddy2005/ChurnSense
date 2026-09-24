import { useState } from "react";
import ResultCard from "./ResultCard";

const SAMPLE_HIGH_RISK = {
  Gender: "Male",
  Age: 45,
  "Under 30": "No",
  "Senior Citizen": "No",
  Married: "No",
  Dependents: "No",
  "Number of Dependents": 0,
  Latitude: 34.0522,
  Longitude: -118.2437,
  Population: 3800000,
  Quarter: "Q3",
  "Referred a Friend": "No",
  "Number of Referrals": 0,
  "Tenure in Months": 4,
  Offer: "Offer E",
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
  Contract: "Month-to-Month",
  "Paperless Billing": "Yes",
  "Payment Method": "Electronic Check",
  "Monthly Charge": 105.5,
  "Total Charges": 422.0,
  "Total Refunds": 0,
  "Total Extra Data Charges": 0,
  "Total Long Distance Charges": 101.6,
  "Total Revenue": 523.6,
  "Satisfaction Score": 1,
  CLTV: 2800,
};

const SAMPLE_LOW_RISK = {
  Gender: "Female",
  Age: 38,
  "Under 30": "No",
  "Senior Citizen": "No",
  Married: "Yes",
  Dependents: "Yes",
  "Number of Dependents": 2,
  Latitude: 37.7749,
  Longitude: -122.4194,
  Population: 870000,
  Quarter: "Q1",
  "Referred a Friend": "Yes",
  "Number of Referrals": 4,
  "Tenure in Months": 48,
  Offer: "Offer B",
  "Phone Service": "Yes",
  "Avg Monthly Long Distance Charges": 18.2,
  "Multiple Lines": "Yes",
  "Internet Service": "Yes",
  "Internet Type": "Fiber Optic",
  "Avg Monthly GB Download": 68,
  "Online Security": "Yes",
  "Online Backup": "Yes",
  "Device Protection Plan": "Yes",
  "Premium Tech Support": "Yes",
  "Streaming TV": "Yes",
  "Streaming Movies": "Yes",
  "Streaming Music": "Yes",
  "Unlimited Data": "Yes",
  Contract: "Two Year",
  "Paperless Billing": "Yes",
  "Payment Method": "Bank Transfer",
  "Monthly Charge": 89.0,
  "Total Charges": 4272.0,
  "Total Refunds": 0,
  "Total Extra Data Charges": 0,
  "Total Long Distance Charges": 873.6,
  "Total Revenue": 5145.6,
  "Satisfaction Score": 5,
  CLTV: 5400,
};

const EMPTY_FORM = SAMPLE_HIGH_RISK;

export default function PredictionForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadSample = (sampleData) => {
    setFormData(sampleData);
    setPrediction(null);
    setError("");
  };

  const calculateLocalPrediction = (data) => {
    let score = 50;
    if (data.Contract === "Month-to-Month") score += 26;
    if (data.Contract === "Two Year") score -= 32;
    if (data["Internet Type"] === "Fiber Optic") score += 12;
    if (data["Online Security"] === "No") score += 10;
    if (data["Premium Tech Support"] === "No") score += 12;

    const sat = Number(data["Satisfaction Score"]);
    score += (3 - sat) * 16;
    const tenure = Number(data["Tenure in Months"]);
    score -= tenure * 0.6;
    const monthly = Number(data["Monthly Charge"]);
    if (monthly > 80) score += 14;

    const finalProb = Math.min(Math.max(score, 4), 98) / 100;
    return {
      prediction: finalProb >= 0.5 ? "Yes" : "No",
      churn_probability: finalProb,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("API response error");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.warn("Backend API unavailable, using local calculation model.", err);
      const localResult = calculateLocalPrediction(requestData);
      setPrediction(localResult);
    } finally {
      setLoading(false);
      setTimeout(() => {
        const el = document.getElementById("prediction-results");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <div>
      {/* Top Preset Toolbar */}
      <div className="preset-toolbar">
        <span className="preset-label">Fill Sample Profile:</span>
        <div className="preset-buttons">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => loadSample(SAMPLE_HIGH_RISK)}
          >
            Sample High Risk
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => loadSample(SAMPLE_LOW_RISK)}
          >
            Sample Low Risk
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Section 1: Demographics */}
        <div className="form-card">
          <h2 className="section-title">1. Customer Demographics</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="Gender" value={formData.Gender} onChange={handleChange} className="form-select" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="number" name="Age" value={formData.Age} onChange={handleChange} className="form-input" min="18" max="100" required />
            </div>

            <div className="form-group">
              <label className="form-label">Under 30?</label>
              <select name="Under 30" value={formData["Under 30"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Senior Citizen?</label>
              <select name="Senior Citizen" value={formData["Senior Citizen"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Married?</label>
              <select name="Married" value={formData.Married} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Has Dependents?</label>
              <select name="Dependents" value={formData.Dependents} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Number of Dependents</label>
              <input type="number" name="Number of Dependents" value={formData["Number of Dependents"]} onChange={handleChange} className="form-input" min="0" required />
            </div>

            <div className="form-group">
              <label className="form-label">Quarter</label>
              <select name="Quarter" value={formData.Quarter} onChange={handleChange} className="form-select" required>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Population</label>
              <input type="number" name="Population" value={formData.Population} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input type="number" step="any" name="Latitude" value={formData.Latitude} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input type="number" step="any" name="Longitude" value={formData.Longitude} onChange={handleChange} className="form-input" required />
            </div>
          </div>
        </div>

        {/* Section 2: Subscribed Services */}
        <div className="form-card">
          <h2 className="section-title">2. Services & Usage</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Phone Service</label>
              <select name="Phone Service" value={formData["Phone Service"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Multiple Lines</label>
              <select name="Multiple Lines" value={formData["Multiple Lines"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No phone service">No phone service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Internet Service</label>
              <select name="Internet Service" value={formData["Internet Service"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Internet Type</label>
              <select name="Internet Type" value={formData["Internet Type"]} onChange={handleChange} className="form-select" required>
                <option value="Fiber Optic">Fiber Optic</option>
                <option value="DSL">DSL</option>
                <option value="Cable">Cable</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Avg Monthly GB Download</label>
              <input type="number" name="Avg Monthly GB Download" value={formData["Avg Monthly GB Download"]} onChange={handleChange} className="form-input" min="0" required />
            </div>

            <div className="form-group">
              <label className="form-label">Online Security</label>
              <select name="Online Security" value={formData["Online Security"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Online Backup</label>
              <select name="Online Backup" value={formData["Online Backup"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Device Protection</label>
              <select name="Device Protection Plan" value={formData["Device Protection Plan"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Premium Tech Support</label>
              <select name="Premium Tech Support" value={formData["Premium Tech Support"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Streaming TV</label>
              <select name="Streaming TV" value={formData["Streaming TV"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Streaming Movies</label>
              <select name="Streaming Movies" value={formData["Streaming Movies"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Streaming Music</label>
              <select name="Streaming Music" value={formData["Streaming Music"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Unlimited Data</label>
              <select name="Unlimited Data" value={formData["Unlimited Data"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Contract & Billing */}
        <div className="form-card">
          <h2 className="section-title">3. Contract & Billing</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Contract Type</label>
              <select name="Contract" value={formData.Contract} onChange={handleChange} className="form-select" required>
                <option value="Month-to-Month">Month-to-Month</option>
                <option value="One Year">One Year</option>
                <option value="Two Year">Two Year</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Paperless Billing</label>
              <select name="Paperless Billing" value={formData["Paperless Billing"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select name="Payment Method" value={formData["Payment Method"]} onChange={handleChange} className="form-select" required>
                <option value="Electronic Check">Electronic Check</option>
                <option value="Mailed Check">Mailed Check</option>
                <option value="Bank Transfer">Bank Transfer (Automatic)</option>
                <option value="Credit Card">Credit Card (Automatic)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Monthly Charge ($)</label>
              <input type="number" step="any" name="Monthly Charge" value={formData["Monthly Charge"]} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Total Charges ($)</label>
              <input type="number" step="any" name="Total Charges" value={formData["Total Charges"]} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Total Refunds ($)</label>
              <input type="number" step="any" name="Total Refunds" value={formData["Total Refunds"]} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Avg Long Distance Charge ($)</label>
              <input type="number" step="any" name="Avg Monthly Long Distance Charges" value={formData["Avg Monthly Long Distance Charges"]} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Total Long Distance Charge ($)</label>
              <input type="number" step="any" name="Total Long Distance Charges" value={formData["Total Long Distance Charges"]} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Total Extra Data Charges ($)</label>
              <input type="number" step="any" name="Total Extra Data Charges" value={formData["Total Extra Data Charges"]} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Total Revenue ($)</label>
              <input type="number" step="any" name="Total Revenue" value={formData["Total Revenue"]} onChange={handleChange} className="form-input" required />
            </div>
          </div>
        </div>

        {/* Section 4: Customer Engagement & Metrics */}
        <div className="form-card">
          <h2 className="section-title">4. Tenure & Engagement Metrics</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Tenure in Months</label>
              <input type="number" name="Tenure in Months" value={formData["Tenure in Months"]} onChange={handleChange} className="form-input" min="1" required />
            </div>

            <div className="form-group">
              <label className="form-label">Satisfaction Score (1 to 5)</label>
              <select name="Satisfaction Score" value={formData["Satisfaction Score"]} onChange={handleChange} className="form-select" required>
                <option value="1">1 (Very Dissatisfied)</option>
                <option value="2">2 (Dissatisfied)</option>
                <option value="3">3 (Neutral)</option>
                <option value="4">4 (Satisfied)</option>
                <option value="5">5 (Very Satisfied)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Offer Assigned</label>
              <select name="Offer" value={formData.Offer} onChange={handleChange} className="form-select" required>
                <option value="None">None</option>
                <option value="Offer A">Offer A</option>
                <option value="Offer B">Offer B</option>
                <option value="Offer C">Offer C</option>
                <option value="Offer D">Offer D</option>
                <option value="Offer E">Offer E</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Referred a Friend?</label>
              <select name="Referred a Friend" value={formData["Referred a Friend"]} onChange={handleChange} className="form-select" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Number of Referrals</label>
              <input type="number" name="Number of Referrals" value={formData["Number of Referrals"]} onChange={handleChange} className="form-input" min="0" required />
            </div>

            <div className="form-group">
              <label className="form-label">Customer Lifetime Value (CLTV)</label>
              <input type="number" step="any" name="CLTV" value={formData.CLTV} onChange={handleChange} className="form-input" required />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: "24px" }}>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ padding: "14px 24px", fontSize: "1rem" }}>
            {loading ? "Calculating Prediction..." : "Predict Churn"}
          </button>
        </div>
      </form>

      {/* Result Section */}
      <div id="prediction-results">
        <ResultCard prediction={prediction} formData={formData} />
      </div>
    </div>
  );
}
