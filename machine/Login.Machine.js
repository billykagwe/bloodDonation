/** @format */

import { createMachine, assign } from "xstate";

const LoginMachine = createMachine({
  id: "Login Machine",
  initial: "idle",
  context: { error: null },
  states: {
    idle: {
      on: {
        LOADING: "loading",
      },
    },
    loading: {
      invoke: {
        src: (context, event) => (callback) => {
          console.log({ data: event?.data });
          fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(event.data),
          })
            .then((res) => res.json())
            .then((data) =>
              data?.error ? callback("ERROR") : callback("SUCCESS")
            )
            .catch(() => callback("IDLE"));
        },
      },
      on: {
        SUCCESS: "success",
        ERROR: {
          target: "error",
          actions: assign({
            error: "Invalid Email/Password",
          }),
        },
      },
    },
    success: {},
    error: {
      after: {
        500: {
          target: "idle",
        },
      },
    },
  },
});

export default LoginMachine;
