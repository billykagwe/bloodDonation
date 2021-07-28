/** @format */

const { createMachine, assign } = require("xstate");

export const PromiseMachine = (operation) =>
  createMachine({
    id: "PromiseMachine",
    initial: "idle",
    context: { data: null },
    states: {
      idle: {
        on: {
          SUBMIT: {
            target: "loading",
            actions: assign({
              data: (context, event) => event.data,
            }),
          },
        },
      },
      loading: {
        invoke: {
          src: (context) => operation(context.data),
          onDone: { target: "success" },
          onError: { target: "error" },
        },
      },
      error: {},
      success: {
        after: {
          1000: {
            target: "idle",
            actions: assign({
              data: null,
            }),
          },
        },
      },
    },
  });
