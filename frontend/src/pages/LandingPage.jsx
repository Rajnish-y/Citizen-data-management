import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0a0a0a",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
      }}
    >

      {/* 3D Background */}
      <Canvas style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade />

        {/* Rotating Globe (wireframe) */}
        <mesh rotation={[0.5, 0.5, 0]}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial color="#2b6cb0" wireframe />
        </mesh>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* Overlay Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
          Citizen Data Authority
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "40px", color: "#cbd5e0" }}>
          A secure blockchain-powered platform for citizen data storage & verification
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={() => navigate("/citizen-login")}
            style={{
              background: "#2b6cb0",
              color: "white",
              fontSize: "1.2rem",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1a365d")}
            onMouseOut={(e) => (e.target.style.background = "#2b6cb0")}
          >
            Citizen Portal
          </button>

          <button
            onClick={() => navigate("/authority-login")}
            style={{
              background: "#16a34a",
              color: "white",
              fontSize: "1.2rem",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#166534")}
            onMouseOut={(e) => (e.target.style.background = "#16a34a")}
          >
            Authority Portal
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
