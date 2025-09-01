import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AuthorityLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy auth
    navigate("/authority-dashboard");
  };

  return (
    <div className="container">
      <h2>Authority Login</h2>
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
      <button className="success" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don’t have an account?{" "}
        <Link to="/authority-signup" style={{ color: "#16a34a" }}>
          Signup here
        </Link>
      </p>
    </div>
  );
}

export default AuthorityLogin;
