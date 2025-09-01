import Navbar from "../components/Navbar";

function AuthorityDashboard() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Authority Dashboard</h2>
        <p>Connected Account: 0xaBcD...5678</p>

        <section>
          <h3>View Citizen Documents</h3>
          <input type="text" placeholder="Enter citizen Ethereum address" />
          <select>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Finance</option>
          </select>
          <button className="success">Load Docs</button>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <h3>Documents (Healthcare)</h3>
          <p>No documents found or access denied</p>
        </section>
      </div>
    </>
  );
}

export default AuthorityDashboard;
