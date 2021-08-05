/** @format */

import React, { useState } from "react";
import Image from "next/image";

import Register from "../components/register";
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
      <div className='flex spaace-x-2 justify-center space-x-4 text-lg bg-blue-50 w-48 mx-auto rounded my-4'>
        <p
          onClick={() => setTab("home")}
          style={{ color: active("home"), cursor: "pointer" }}>
          Home
        </p>
        <p
          onClick={() => setTab("register")}
          style={{ color: active("register"), cursor: "pointer" }}>
          Register
        </p>
      </div>
      {tab === "home" && <HomePage />}
      {tab === "register" && <Register />}
    </div>
  );
}

export default Index;
