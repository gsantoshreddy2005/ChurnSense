import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Cpu,
  BarChart3,
  Award
} from "lucide-react";
import "./style/Hero.css";

export default function Hero() {
  // Live interactive demo state inside hero
  const [tenure, setTenure] = useState(6);
  const [monthlyCharge, setMonthlyCharge] = useState(85);
  const [satisfaction, setSatisfaction] = useState(2);
  const [contract, setContract] = useState("Month-to-Month");

  // Calculate quick mock score for live preview
  const calculateSimScore = () => {
    let base = 50;
    if (contract === "Month-to-Month") base += 25;
    if (contract === "Two Year") base -= 30;

    base += (monthlyCharge - 50) * 0.3;
    base -= tenure * 0.8;
    base += (3 - satisfaction) * 15;

    return Math.min(Math.max(Math.round(base), 5), 98);
  };

  const simRisk = calculateSimScore();

  const getRiskColor = (risk) => {
    if (risk >= 65) return "#f43f5e";
    if (risk >= 35) return "#f59e0b";
    return "#10b981";
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headline & Hero Text */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Next-Gen Machine Learning Platform v2.0</span>
            </div>

            <h1 className="hero-title">
              Predict Customer <span className="gradient-text">Churn</span>. Protect Your Revenue.
            </h1>

            <p className="hero-description">
              ChurnSense uses multi-variable AI models to identify retention risks in real-time. Gain 360° visibility into customer dissatisfaction and deploy automated retention strategies before clients leave.
            </p>

            <div className="hero-cta-group">
              <Link to="/predict" className="btn btn-primary btn-lg">
                <span>Start Churn Assessment</span>
                <ArrowRight size={20} />
              </Link>
              <a href="#demo-sim" className="btn btn-secondary btn-lg">
                <Sliders size={18} />
                <span>Try Live Simulator</span>
              </a>
            </div>

            <div className="hero-stats-row">
              <div className="stat-card">
                <h4 className="gradient-text">94.8%</h4>
                <p>ML Precision</p>
              </div>
              <div className="stat-card">
                <h4 className="gradient-text-cyan">40+</h4>
                <p>Risk Drivers</p>
              </div>
              <div className="stat-card">
                <h4 className="gradient-text">&lt;20ms</h4>
                <p>Inference Latency</p>
              </div>
              <div className="stat-card">
                <h4 className="gradient-text-rose">$1.4M+</h4>
                <p>Protected ARR</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Demo Simulator Widget */}
          <div className="hero-sim-wrapper" id="demo-sim">
            <div className="glass-panel hero-sim-card glass-panel-hover">
              <div className="sim-header">
                <div className="sim-title">
                  <Cpu className="gradient-text" size={22} />
                  <span>Interactive Risk Sandbox</span>
                </div>
                <span className="badge badge-indigo">Real-time Feedback</span>
              </div>

              <div className="sim-controls">
                <div className="form-group">
                  <div className="form-label">
                    <span>Customer Tenure</span>
                    <span className="val-tag">{tenure} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="72"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="form-range"
                  />
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <span>Monthly Subscription</span>
                    <span className="val-tag">${monthlyCharge}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={monthlyCharge}
                    onChange={(e) => setMonthlyCharge(Number(e.target.value))}
                    className="form-range"
                  />
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <span>Contract Commitment</span>
                  </div>
                  <div className="toggle-group">
                    {["Month-to-Month", "One Year", "Two Year"].map((item) => (
                      <div
                        key={item}
                        className={`toggle-option ${contract === item ? "selected" : ""}`}
                        onClick={() => setContract(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <span>Satisfaction Rating (1 - 5)</span>
                    <span className="val-tag">{satisfaction} / 5</span>
                  </div>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${satisfaction === star ? "active" : ""}`}
                        onClick={() => setSatisfaction(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Simulated Result Output */}
              <div className="sim-meter-wrapper">
                <div className="sim-risk-header">
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    Estimated Churn Risk
                  </span>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: `${getRiskColor(simRisk)}20`,
                      color: getRiskColor(simRisk),
                      border: `1px solid ${getRiskColor(simRisk)}50`
                    }}
                  >
                    {simRisk >= 65 ? "High Risk" : simRisk >= 35 ? "Moderate" : "Low Risk"}
                  </span>
                </div>

                <div className="sim-risk-val" style={{ color: getRiskColor(simRisk) }}>
                  {simRisk}%
                </div>

                <div className="sim-progress-bg">
                  <div
                    className="sim-progress-fill"
                    style={{
                      width: `${simRisk}%`,
                      backgroundColor: getRiskColor(simRisk)
                    }}
                  ></div>
                </div>

                <p className="sim-action-hint">
                  {simRisk >= 65 ? (
                    <span style={{ color: "#f43f5e", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <TrendingDown size={14} /> Critical: High risk of cancellation within 30 days
                    </span>
                  ) : (
                    <span style={{ color: "#10b981", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <TrendingUp size={14} /> Healthy customer loyalty signature
                    </span>
                  )}
                </p>
              </div>

              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link to="/predict" className="btn btn-outline btn-sm" style={{ width: "100%" }}>
                  <Zap size={14} /> Analyze Full 40+ Feature Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}