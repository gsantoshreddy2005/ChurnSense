import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="app-container">
      <NavBar />
      <main>
        {/* Intro Hero Box */}
        <div
          className="form-card"
          style={{
            padding: "40px 32px",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            Customer Churn Risk Intelligence
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Predict subscriber churn probability using machine learning. Enter customer demographics, billing metrics, and service usage to compute real-time risk scores.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link
              to="/predict"
              className="btn btn-primary"
              style={{ padding: "12px 28px", fontSize: "0.95rem" }}
            >
              Start Churn Assessment →
            </Link>
          </div>
        </div>

        {/* 3-Step Process Overview */}
        <div style={{ marginBottom: "32px" }}>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            How It Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            <div className="form-card" style={{ marginBottom: 0 }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: uppercaseText,
                  marginBottom: "6px",
                }}
              >
                Step 1
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                1. Customer Features
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                }}
              >
                Input subscriber age, tenure, contract type, monthly charges, and service add-ons.
              </p>
            </div>

            <div className="form-card" style={{ marginBottom: 0 }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: uppercaseText,
                  marginBottom: "6px",
                }}
              >
                Step 2
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                2. ML Prediction
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                }}
              >
                Process customer feature inputs through the trained classification model API.
              </p>
            </div>

            <div className="form-card" style={{ marginBottom: 0 }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: uppercaseText,
                  marginBottom: "6px",
                }}
              >
                Step 3
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                3. Risk Output
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                }}
              >
                Receive clear probability scores, outcome status, and key contributing features.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>ChurnSense — Customer Churn Prediction Tool</p>
      </footer>
    </div>
  );
}

const uppercaseText = "uppercase";