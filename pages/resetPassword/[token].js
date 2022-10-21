/** @format */

import { useRouter } from "next/dist/client/router";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useState } from "react";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";

const validateToken = (token) => {
  try {
    return jwt.verify(token, "blooddonors");
  } catch (error) {
    return null;
  }
};

const ResetPassword = () => {
  const { query, replace } = useRouter();
  const token = query?.token;

  const [state, send] = useMachine(UpdatePasswordMachine, {
    actions: {
      redirectToLogin: () => {
        replace("/");
      },
    },
  });

  const [auth, setAuth] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  if (!validateToken(token)) {
    return (
      <div className=' max-w-4xl mx-auto flex flex-col px-2  mt-8 p-4 py-16'>
        <p className='text-2xl font-bold mb-2 '>Update Link is expired</p>
        <p>
          Please proceed to
          <Link href='/'>
            <a className='text-blue-600 cursor-pointer'>login page</a>
          </Link>
          to generate a new one
        </p>
      </div>
    );
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (auth.newPassword === auth.confirmPassword) {
      send({ type: "SUBMIT", data: auth.newPassword });
    }
  };

  return (
    <div className=' max-w-4xl mx-auto flex flex-col px-2  mt-8 p-4 py-16'>
      <div>
        <p className='text-2xl font-bold  '>Enter new Password</p>
        <p>Create a new password for the next login</p>
        <form onSubmit={submitHandler} className='mt-8'>
          <div className='flex flex-col'>
            <label className='mb-1 font-medium'>New Password</label>
            <input
              onChange={(e) =>
                setAuth({ ...auth, newPassword: e.target.value })
              }
              value={auth.newPassword}
              className=' border  max-w-xs p-2 w-full'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label className='mb-1'>Confirm Password</label>
            <input
              onChange={(e) =>
                setAuth({ ...auth, confirmPassword: e.target.value })
              }
              value={auth.confirmPassword}
              className='border max-w-xs p-2 w-full'
            />
          </div>

          {state.matches("idle") && (
            <button className='px-8 rounded-md mt-4 text-white  py-2 text-center bg-blue-600'>
              Reset Password
            </button>
          )}
          {state.matches("loading") && (
            <button className='px-8 rounded-md mt-4 text-white  py-2 text-center bg-blue-600'>
              loading...
            </button>
          )}
          {state.matches("success") && (
            <button className='px-8 rounded-md mt-4 text-white  py-2 text-center bg-green-600'>
              Update Password Success
            </button>
          )}
          {state.matches("error") && (
            <button
              on
              className='px-8 rounded-md mt-4 text-white  py-2 text-center bg-red-600'>
              {state.context.error}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

const Success = () => {
  return (
    <button className='px-8 rounded-md mt-4 text-white  py-2 text-center bg-green-600'>
      Update Password Success
    </button>
  );
};

// validate token ✅
// if valid proceed to accept a new password ✅
// else alert user the token is expired and they need to generate a new one ✅

const UpdatePasswordMachine = createMachine(
  {
    id: "UpdatePassword",
    initial: "idle",
    context: {
      password: null,
      error: null,
    },
    states: {
      idle: {
        on: {
          SUBMIT: {
            target: "loading",
            actions: [
              assign({
                password: (_, event) => event.data,
              }),
            ],
          },
        },
      },
      loading: {
        invoke: {
          src: "updatePassword",
          onDone: {
            actions: [(context, event) => console.log(context, event)],
            target: "success",
          },
          onError: {
            actions: [
              assign({
                error: (context, event) => event.data,
              }),
            ],

            target: "error",
          },
        },
      },
      success: {
        after: {
          1000: {
            actions: ["redirectToLogin"],
          },
        },
      },
      error: {
        on: {
          SUBMIT: "idle",
        },
      },
    },
  },
  {
    services: {
      updatePassword: (ctx, event) => {
        return fetch("/api/updatePassword", {
          method: "POST",
          body: JSON.stringify({
            password: ctx.password,
          }),
        })
          .then((res) => res.json())
          .then(parseError)
          .catch((res) => {
            return Promise.reject(res.error);
          });
      },
    },
  }
);

const parseError = (data) => {
  if (data.error) {
    return Promise.reject({ error: data.error });
  }
  return Promise.resolve(data);
};
