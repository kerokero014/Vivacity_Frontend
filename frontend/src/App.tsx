// src/App.tsx

import React from "react";
import ParticlesBackground from "./components/ParticleBackground";
import Header from "./components/MainHeader";
import Image from "./assets/Mylogo.png";

const App: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <ParticlesBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header logoSrc={Image} altText="My Logo" />
      </div>
    </div>
  );
};

export default App;