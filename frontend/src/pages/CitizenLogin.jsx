import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CitizenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy auth
    navigate("/citizen-dashboard");
  };

  return (
    <div className="container">
      <h2>Citizen Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="primary" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don’t have an account?{" "}
        <Link to="/citizen-signup" style={{ color: "#2b6cb0" }}>
          Signup here
        </Link>
      </p>
    </div>
  );
}

export default CitizenLogin;
