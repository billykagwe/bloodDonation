/** @format */

import { useState } from "react";
import Image from "next/image";

function Login({ state, send }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    send({ type: "LOADING", data: formData });
  };

  const hasError = state.context.error;

  if (state.matches("login.resetPassword")) {
    return (
      <div className='max-w-2xl mx-auto flex flex-col  justify-center mt-8'>
        <p className=' mt-3 mb-2 font-bold text-2xl '> Reset Password</p>
        <div>
          <p>An email will be sent with instructions to reset your password</p>
          {state.matches("login.resetPassword.idle") && (
            <button
              onClick={() => send("RESET")}
              className='flex space-x-3 py-2 px-8 bg-blue-600 text-white  mt-8'>
              <span>Proceed</span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                  />
                </svg>
              </span>
            </button>
          )}

          {state.matches("login.resetPassword.emailSent") && (
            <div className='mt-8 p-8 bg-green-100'>
              <p className='text-xl text-green-600 font-bold mb-2'>
                Reset Email Sent
              </p>
              <p>Please check your email inbox</p>
            </div>
          )}

          {state.matches("login.resetPassword.loading") && (
            <button className='  px-8 font-medium inline-block mt-2 text-black text-center rounded p-2'>
              Loading...
            </button>
          )}
          {state.matches("login.resetPassword.error") && (
            <button className='bg-red-600  px-8 font-medium inline-block mt-2 text-white text-center rounded p-2'>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitHandler}
      className='sm:max-w-sm mt-8 shadow-md p-4 rounded sm:mx-auto mx-2'>
      {!state.matches("login.success") && (
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

          <p className=' mt-3 mb-4 font-bold text-2xl '>
            Log in to your account
          </p>
          {hasError && <p className='text-red-500 '>Invalid email/password</p>}
          <div className=''>
            <input
              name='email'
              onChange={changeHandler}
              value={formData.email}
              type='email'
              placeholder='Email'
              className={`p-2 my-2 border bg-white rounded w-full ${
                hasError && "border-red-500"
              }`}
            />
            <input
              name='password'
              value={formData.password}
              onChange={changeHandler}
              placeholder='Password'
              type='password'
              className={`p-2 my-2 border bg-white rounded w-full ${
                hasError && "border-red-500"
              }`}
            />
            {!!state.context.loginAttempts && (
              <p
                onClick={() => send({ type: "RESET_PASSWORD" })}
                className='text-right cursor-pointer hover:underline'>
                Forgot Password?
              </p>
            )}
          </div>
        </>
      )}
      {state.matches("login.idle") && (
        <button
          type='submit'
          className='bg-blue-600  px-8 font-medium inline-block mt-2 text-white text-center rounded p-2'>
          Submit
        </button>
      )}

      {state.matches("login.loading") && (
        <button className='bg-blue-600  px-8 font-medium inline-block mt-2 text-white text-center rounded p-2'>
          Loading...
        </button>
      )}

      {state.matches("login.success") && <Success />}
    </form>
  );
}

export default Login;

const Success = () => {
  return (
    <div>
      <div className='h-24 flex items-center justify-center '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-16 h-16 text-green-600'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
          />
        </svg>
      </div>
      <div className='mt-4 '>
        <p className='text-2xl text-center font-bold text-green-600'>Success</p>
      </div>
    </div>
  );
};
