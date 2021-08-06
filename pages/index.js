/** @format */

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HomePage from "../components/HomePage";
function Index() {
  const [tab, setTab] = useState("home");
  const active = (val) => (val === tab ? "blue" : "black");
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3rem",
        }}>
        <Image width={150} height={150} alt='logo' src='/logo.png' />
      </div>

      <HomePage />
    </div>
  );
}

export default Index;
