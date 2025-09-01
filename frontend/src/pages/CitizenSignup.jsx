import { useNavigate, Link } from "react-router-dom";

function CitizenSignup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/citizen-dashboard");
  };

  return (
    <div className="container">
      <h2>Citizen Signup</h2>
      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="success" onClick={handleSignup}>
        Signup
      </button>
      <p>
        Already have an account?{" "}
        <Link to="/citizen-login" style={{ color: "#2b6cb0" }}>
          Login here
        </Link>
      </p>
    </div>
  );
}

export default CitizenSignup;
