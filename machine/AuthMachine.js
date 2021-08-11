/** @format */

import { createMachine } from "xstate";

const AuthMachine = createMachine({
  id: "Auth Machine",
  initial: "idle",
  states: {
    idle: {
      invoke: {
        src: (context, event) => (callback) => {
          fetch("/api/user")
            .then((res) => res.json())
            .then((user) => {
              user?.isLoggedIn ? callback("SIGNED_IN") : callback("SIGNED_OUT");
            });
        },
      },
      on: {
        SIGNED_IN: "home",
        SIGNED_OUT: "login",
      },
    },
    login: {},
    home: {},
  },
});

export default AuthMachine;
