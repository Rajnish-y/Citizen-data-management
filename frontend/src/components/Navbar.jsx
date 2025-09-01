import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav>
      <h1>Citizen Data Portal</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {onLogout && <button onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
