import NavBar from "../components/NavBar"
import PredictionForm from "../components/PredictionForm"
import ResultCard from "../components/ResultCard"


export default function Predict() {
    return (
        <>
            <NavBar />

            <main>
                <PredictionForm />
                <ResultCard />
            </main>
        </>
    );
}