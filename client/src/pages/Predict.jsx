import NavBar from "../components/NavBar";
import PredictionForm from "../components/PredictionForm";

export default function Predict() {
  return (
    <div className="app-container">
      <NavBar />
      <main>
        <PredictionForm />
      </main>
      <footer className="app-footer">
        <p>ChurnSense — Customer Churn Prediction Tool</p>
      </footer>
    </div>
  );
}