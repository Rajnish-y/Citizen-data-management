import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CitizenData from "../CitizenData.json"; // ABI file copied from backend
import Navbar from "../components/Navbar";

const contractAddress = "0xD6D53323b7653CFAFE79819e41b297499E77f499";

function CitizenDashboard() {
  const [account, setAccount] = useState("");
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("healthcare");
  const [shareAddress, setShareAddress] = useState("");
  const [accessList, setAccessList] = useState([]);

  // Connect wallet
  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask first!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
    return { provider, signer };
  }

  // Upload dummy file (replace later with IPFS CID)
  async function uploadDocument() {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, CitizenData.abi, signer);

    // TODO: Replace this with actual IPFS CID when you hook IPFS again
    const fakeCID = "dummyCID-" + file.name;

    const tx = await contract.uploadDocument(fakeCID, category);
    await tx.wait();

    alert("✅ Document uploaded!");
    loadDocuments();
  }

  // Load user docs
  async function loadDocuments() {
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, CitizenData.abi, signer);
    const docsList = await contract.getDocuments(account, category);
    setDocs(docsList);
  }

  // Grant access
  async function grantAccess() {
    if (!shareAddress) {
      alert("Enter an address first!");
      return;
    }
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, CitizenData.abi, signer);
    const tx = await contract.grantAccess(shareAddress);
    await tx.wait();
    alert("✅ Access granted to " + shareAddress);
    loadAccessList();
  }

  // Revoke access
  async function revokeAccess() {
    if (!shareAddress) {
      alert("Enter an address first!");
      return;
    }
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, CitizenData.abi, signer);
    const tx = await contract.revokeAccess(shareAddress);
    await tx.wait();
    alert("🚫 Access revoked from " + shareAddress);
    loadAccessList();
  }

  // Load list of who has access
  async function loadAccessList() {
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, CitizenData.abi, signer);
    const list = await contract.getAccessList(account);
    setAccessList(list);
  }

  // Auto-load after connecting
  useEffect(() => {
    if (account) {
      loadDocuments();
      loadAccessList();
    }
  }, [account, category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
      <Navbar />

      <div className="container">
        <h2>Citizen Dashboard</h2>
        <p><b>Connected Account:</b> {account || "Not connected"}</p>
        <button className="primary" onClick={connectWallet}>
          Connect Wallet
        </button>

        {/* Upload Section */}
        <section style={{ marginTop: "2rem" }}>
          <h3>Upload Document</h3>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
            </select>
            <button className="primary" onClick={uploadDocument}>
              Upload
            </button>
          </div>
        </section>

        {/* Manage Access Section */}
        <section style={{ marginTop: "2rem" }}>
          <h3>Manage Access</h3>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Enter Ethereum address"
              value={shareAddress}
              onChange={(e) => setShareAddress(e.target.value)}
            />
            <button className="success" onClick={grantAccess}>
              Grant
            </button>
            <button className="danger" onClick={revokeAccess}>
              Revoke
            </button>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <b>Granted Accounts:</b>
            <ul>
              {accessList.length > 0 ? (
                accessList.map((addr, i) => <li key={i}>{addr}</li>)
              ) : (
                <p>No access granted</p>
              )}
            </ul>
          </div>
        </section>

        {/* My Documents */}
        <section style={{ marginTop: "2rem" }}>
          <h3>My Documents ({category})</h3>
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
    <p>No documents found</p>
  )}
</ul>

        </section>
      </div>
    </div>
  );
}

export default CitizenDashboard;
