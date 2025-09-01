import { useState } from "react";
import { ethers } from "ethers";
import CitizenData from "../CitizenData.json"; // ABI copied from backend
import Navbar from "../components/Navbar";

const contractAddress = "0xD6D53323b7653CFAFE79819e41b297499E77f499";

function AuthorityDashboard() {
  const [account, setAccount] = useState("");
  const [citizenAddress, setCitizenAddress] = useState("");
  const [category, setCategory] = useState("healthcare");
  const [docs, setDocs] = useState([]);

  // Connect MetaMask
  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
    return { provider, signer };
  }

  // Load citizen documents
  async function loadCitizenDocs() {
    if (!citizenAddress) {
      alert("Please enter a citizen Ethereum address.");
      return;
    }
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, CitizenData.abi, signer);

    try {
      const result = await contract.getDocuments(citizenAddress, category);
      setDocs(result);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch docs. Possibly no access granted.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
      <Navbar />

      <div className="container">
        <h2>Authority Dashboard</h2>
        <p><b>Connected Account:</b> {account || "Not connected"}</p>
        <button className="primary" onClick={connectWallet}>
          Connect Wallet
        </button>

        {/* Citizen Docs Viewer */}
        <section style={{ marginTop: "2rem" }}>
          <h3>View Citizen Documents</h3>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Enter citizen Ethereum address"
              value={citizenAddress}
              onChange={(e) => setCitizenAddress(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
            </select>
            <button className="success" onClick={loadCitizenDocs}>
              Load Docs
            </button>
          </div>

          {/* Documents */}
          <div style={{ marginTop: "1rem" }}>
            <b>Documents for {citizenAddress || "N/A"} ({category}):</b>
            <ul>
  {docs.length > 0 ? (
    docs.map((cid, idx) => (
      <li key={idx}>
        <a
          href={`https://ipfs.io/ipfs/${cid}`}
          target="_blank"
          rel="noreferrer"
        >
          {cid}
        </a>
      </li>
    ))
  ) : (
    <p>No documents found or no access granted.</p>
  )}
</ul>

          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthorityDashboard;
