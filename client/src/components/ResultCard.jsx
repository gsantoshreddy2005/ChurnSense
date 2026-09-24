export default function ResultCard({ prediction, formData }) {
  if (!prediction) return null;

  const probability = Math.round(prediction.churn_probability * 100);
  const isHighRisk = probability >= 50;

  return (
    <div className="result-card">
      <div className="result-header">
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
            Prediction Result
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Calculated churn probability based on customer feature inputs
          </p>
        </div>

        <span className={`result-badge ${isHighRisk ? "high" : "low"}`}>
          {isHighRisk ? "High Churn Risk" : "Low Churn Risk"}
        </span>
      </div>

      <div className="result-stats-grid">
        <div className="stat-box">
          <div className="stat-label">Churn Probability</div>
          <div className="stat-value" style={{ color: isHighRisk ? "#f87171" : "#34d399" }}>
            {probability}%
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Prediction Outcome</div>
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>
            {isHighRisk ? "Likely to Churn" : "Likely to Retain"}
          </div>
        </div>
      </div>

      {/* Summary Details */}
      <div style={{ background: "var(--input-bg)", padding: "16px", borderRadius: "6px", border: "1px solid var(--panel-border)" }}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px", color: "var(--text-secondary)" }}>
          Summary Highlights
        </h4>
        <ul style={{ listStyle: "disc", paddingLeft: "20px", fontSize: "0.875rem", color: "var(--text-primary)" }}>
          {formData && (
            <>
              <li>Contract: <strong>{formData.Contract}</strong></li>
              <li>Satisfaction Score: <strong>{formData["Satisfaction Score"]} / 5</strong></li>
              <li>Tenure: <strong>{formData["Tenure in Months"]} Months</strong></li>
              <li>Monthly Charge: <strong>${formData["Monthly Charge"]}</strong></li>
              <li>Customer Lifetime Value (CLTV): <strong>${formData.CLTV}</strong></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
