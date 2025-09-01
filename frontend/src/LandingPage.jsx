import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing">
      <h1>Citizen Data Authority</h1>
      <p>A secure blockchain-powered platform for citizen data storage & verification</p>
      <div className="buttons">
        <Link to="/citizen-login">
          <button className="primary">Citizen Portal</button>
        </Link>
        <Link to="/authority-login">
          <button className="success">Authority Portal</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
