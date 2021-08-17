/** @format */

import { after } from "xstate/lib/actions";

const { createMachine, assign } = require("xstate");

const isValid = (data) => {
  const {
    firstName,
    lastName,
    middleName,
    occupation,
    bloodGroup,
    willingVolunteer,
  } = data;
  console.log({
    firstName,
    lastName,
    middleName,
    occupation,
    bloodGroup,
    willingVolunteer,
  });
  return [
    firstName,
    lastName,
    middleName,
    occupation,
    bloodGroup,
    willingVolunteer,
  ].every((val) => !!val);
};

export const PromiseMachine = (operation) =>
  createMachine({
    id: "PromiseMachine",
    initial: "idle",
    context: { data: null, error: null },
    states: {
      idle: {
        on: {
          SUBMIT: [
            {
              target: "loading",
              cond: (context, event) => {
                return isValid(event.data.formData);
              },
              actions: assign({
                data: (context, event) => event.data,
                error: () => null,
              }),
            },
            {
              target: "idle",
              actions: assign({
                error: "Please fill all required fields",
              }),
            },
          ],
        },
      },
      loading: {
        invoke: {
          src: (context) => (callback) => {
            operation(context.data).then((res) => {
              if (res.keyPattern)
                callback({ type: "ERROR", error: "User already exists" });
              else callback("SUCCESS");
            });
          },
        },
        on: {
          ERROR: "error",
          SUCCESS: "success",
        },
      },
      error: {
        entry: assign({
          error: (context, event) => {
            console.log({ event });
            return event.error;
          },
        }),
        on: {
          RETRY: "idle",
        },
      },
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
