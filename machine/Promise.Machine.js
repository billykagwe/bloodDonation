/** @format */


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
                console.log({event})
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
            console.log({context})
            operation(context.data).then(res => res.json()).then((data) => {
              console.log({data})
              if (data.error)
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
        type:"final"
      },
    },
  });
