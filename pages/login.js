/** @format */

import React from "react";
import Image from "next/image";
function login() {
  return (
    <div className='sm:max-w-sm mt-8 shadow-md p-4 rounded sm:mx-auto mx-2'>
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
        <input placeholder='Email' className='p-2 my-2 border rounded w-full' />
        <input
          placeholder='Password'
          type='password'
          className='p-2 my-2 border rounded w-full '
        />
      </div>
      <button className='bg-blue-400 inline-block mt-2 text-white text-center rounded p-2'>
        Submit
      </button>
    </div>
  );
}

export default login;
