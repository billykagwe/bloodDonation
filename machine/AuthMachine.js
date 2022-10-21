/** @format */

import { createMachine, assign } from "xstate";

const AuthMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFgAgLIEMBjTASwDswA6EiAGzAGIBlASQHEA5AUQBEB9FhwDaABgC6iUAAcA9rBLoSMspJAAPRACYRAVkoiAzJp0BGAyc1mDIkwHYANCACeiABwHKAFhE+TO265mAJw+tgC+YY5oWHhEpBTUdIysnLx8APIAqgAqohJIILLyisqqGggmnp76Ia6aQbYmAGxBVU0Gji4Imq56OkH1to39TU12TRFRGDgExORUtDJQ5In0DAAy6cg8gmx5qkUKSioF5bYGQZStxjo6xkE6TSKanVpNtvq9umZNnrYP50mIGiMzi80oi2WZAhMnwEHIUGYmQAwsiuEwmPsCocSidQGcLldPDc7v1Hs9Xt0-JRLDoRJ4Bt9XEFfkCQbE5glIStFnCEQwuAAlQXpQVY6RyI6lU6IEyGJr6Yk6bwGTwtTTvSmaeqUazuWoDWxPBps6Yc+ILJYrWCoQiEOCwBhqWDofDoKj4ABm7oATgAKOU+ACUDHZswtMKhlBtdod4sKktxZUQnlcrhpPhsTVcthEQVaHWciAMqsoZlsOiMtwefgmkWBZvD4O50LAPp9Mh9Tpdbo93rbfrpIhDYbBXKtrfbnfjOOOyYq8sVxhVaoGmqLCAuHwMudcLWJf2zjwi9bIMggcFUo85VBo9AOibnMoQAFo7pQRobNAY04Y81qdSqVxPGaIw1UrERwnra8IxbVYwAfYon3xRB2j0P5jCafoqlTSkLhMK5820W5lQaEtTRiJtxyjXl4TIKBEKlPF1Dcc59EDTRbG1atRgAy4gJA9pNHA8xNAo0Eb0ja1bXtWB4GxR9pRQzcQkoOoh0CTxzCCPwdDw9xKHeYxmREOpVRacTzWbCdKDbDsfUYpNnxMExAkoIYK3MTw6U4gw9I3H9+PzXT-meHxv0sqjLShRzkJYzdiTU4wfE07TdMpCw9ECHz-hLOphNcSKxyoTAZAAWwQhSkKU+KtPTZkLnlJptBckxKRfYwrnpIwczVCxnl6Iqb1imryhfQMPxZL8f1cP8gnaly9GsLTtHqNMcJPMIgA */
  createMachine(
    {
      id: "Auth Machine",
      initial: "idle",
      context: {
        loginAttempts: 0,
      },
      states: {
        idle: {
          invoke: {
            src: (context, event) => (callback) => {
              fetch("/api/user")
                .then((res) => res.json())
                .then((user) => {
                  user?.isLoggedIn
                    ? callback("SIGNED_IN")
                    : callback("SIGNED_OUT");
                });
            },
          },
          on: {
            SIGNED_IN: {
              target: "home",
            },
            SIGNED_OUT: {
              target: "login",
            },
          },
        },
        login: {
          initial: "idle",
          states: {
            idle: {
              on: {
                LOADING: {
                  target: "loading",
                  cond: (_context, event) => {
                    const { email, password } = event.data;
                    return !!email && !!password;
                  },
                },
                RESET_PASSWORD: {
                  target: "resetPassword",
                },
              },
            },
            resetPassword: {
              initial: "idle",
              states: {
                idle: {
                  on: {
                    RESET: "loading",
                  },
                },
                loading: {
                  invoke: {
                    src: "sendResetEmail",
                    onDone: { target: "emailSent" },
                    onError: { target: "error" },
                  },
                },
                emailSent: {},
                error: {},
              },
            },
            loading: {
              invoke: {
                src: (context, event) => (callback) => {
                  fetch("/api/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(event.data),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      data?.error ? callback("ERROR") : callback("SUCCESS");
                    })
                    .catch(() => callback("IDLE"));
                },
              },
              on: {
                SUCCESS: {
                  target: "success",
                },
                ERROR: {
                  target: "error",
                  actions: assign({
                    error: "Invalid Email/Password",
                    loginAttempts: (ctx) => ctx.loginAttempts + 1,
                  }),
                },
              },
            },
            success: {
              after: {
                1000: {
                  target: "#Auth Machine.home",
                  actions: [],
                  internal: false,
                },
              },
            },
            error: {
              after: {
                500: {
                  target: "#Auth Machine.login.idle",
                  actions: [],
                  internal: false,
                },
              },
            },
          },
        },
        home: {
          initial: "idle",

          states: {
            idle: {
              on: {
                LOGOUT: {
                  target: "loggingOut",
                },
              },
            },
            loggingOut: {
              invoke: {
                src: "logout",
                onDone: {
                  target: "#Auth Machine.login",
                },
                onError: {
                  target: "idle",
                },
              },
            },
          },
        },
      },
    },
    {
      services: {
        sendResetEmail: () => {
          return fetch("/api/resetPassword")
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => err);
        },
        logout: () => {
          return fetch("/api/logout")
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => err);
        },
      },
    }
  );

export default AuthMachine;
