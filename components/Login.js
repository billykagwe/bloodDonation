/** @format */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMachine } from "@xstate/react";
import LoginMachine from "../machine/Login.Machine";
import router from "next/router";

function Login() {
  const [state, send] = useMachine(LoginMachine);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='sm:max-w-sm mt-8 shadow-md p-4 rounded sm:mx-auto mx-2'>
      {state.matches("idle") && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image width={100} height={100} alt='logo' src='/logo.png' />
          </div>

          <p className='mb-1 mt-3  text-blue-400 '>Log in to your account</p>

          <div className='mt-2'>
            <input
              name='email'
              onChange={changeHandler}
              value={formData.email}
              type='email'
              placeholder='Email'
              className='p-2 my-2 border bg-white rounded w-full'
            />
            <input
              name='password'
              value={formData.password}
              onChange={changeHandler}
              placeholder='Password'
              type='password'
              className='p-2 my-2 bg-white border rounded w-full '
            />
          </div>
          {state.context.error && (
            <p className='text-red-400 '>Invalid email/password</p>
          )}
          <button
            onClick={() => send({ type: "LOADING", data: formData })}
            type='submit'
            className='bg-blue-400 inline-block mt-2 text-white text-center rounded p-2'>
            Submit
          </button>
        </>
      )}
      {state.matches("loading") && <p className='text-center'>loading...</p>}
      {state.matches("success") && <Success />}
    </div>
  );
}

export default Login;

const Success = () => {
  useEffect(() => {
    router.reload();
  }, []);
  return <div>Success</div>;
};
