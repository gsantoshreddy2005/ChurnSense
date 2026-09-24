import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  return (
    <header className="app-header">
      <Link to="/" className="brand">
        <span className="brand-name">ChurnSense</span>
        <span className="brand-subtitle">Customer Churn Prediction Tool</span>
      </Link>

      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: location.pathname === "/" ? "#ffffff" : "var(--text-secondary)",
          }}
        >
          Home
        </Link>
        <Link
          to="/predict"
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: location.pathname === "/predict" ? "#ffffff" : "var(--text-secondary)",
          }}
        >
          Prediction Tool
        </Link>
        <Link to="/predict" className="btn btn-primary btn-sm">
          Predict Churn
        </Link>
      </nav>
    </header>
  );
}