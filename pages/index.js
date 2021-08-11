/** @format */

import React from "react";
import Image from "next/image";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import { useMachine } from "@xstate/react";
import AuthMachine from "../machine/AuthMachine";
function Index() {
  const [state, send] = useMachine(AuthMachine);

  return (
    <div>
      {state.matches("login") && <Login />}

      {state.matches("home") && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}>
            <Image width={100} height={100} alt='logo' src='/logo.png' />
          </div>
          <HomePage />
        </>
      )}
    </div>
  );
}

export default Index;
