import { useNavigate, Link } from "react-router-dom";

function AuthoritySignup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/authority-dashboard");
  };

  return (
    <div className="container">
      <h2>Authority Signup</h2>
      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="success" onClick={handleSignup}>
        Signup
      </button>
      <p>
        Already have an account?{" "}
        <Link to="/authority-login" style={{ color: "#16a34a" }}>
          Login here
        </Link>
      </p>
    </div>
  );
}

export default AuthoritySignup;
