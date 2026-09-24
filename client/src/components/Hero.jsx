import {Link} from "react-router-dom";

export default function Hero() {
    return (
        <main>
            <div>
                <h1>CHURNSENSE</h1>

                <p>Know Your customer's Opinion</p>
                <Link to="/predict">Churn</Link>
            </div>
        </main>
    );
}