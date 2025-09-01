import Navbar from "../components/Navbar";

function CitizenDashboard() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Citizen Dashboard</h2>
        <p>Connected Account: 0x1234...abcd</p>

        <section>
          <h3>Upload Document</h3>
          <input type="file" />
          <select>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Finance</option>
          </select>
          <button className="primary">Upload</button>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <h3>Manage Access</h3>
          <input type="text" placeholder="Enter Ethereum address" />
          <button className="success">Grant</button>
          <button className="danger">Revoke</button>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <h3>My Documents</h3>
          <p>No documents found</p>
        </section>
      </div>
    </>
  );
}

export default CitizenDashboard;
