/** @format */

import Image from "next/image";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import { useMachine } from "@xstate/react";
import AuthMachine from "../machine/AuthMachine";
import Head from "next/head";
function Index() {
  const [state, send] = useMachine(AuthMachine);
  console.log(state.value);
  return (
    <div>
      <Head>
        <title>Team Oshwal Blood Donation</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />

        <link
          sizes='60x60'
          rel='shortcut icon'
          href='/logo.png'
          type='image/x-icon'
        />
      </Head>
      {state.matches("login") && <Login state={state} send={send} />}

      {state.matches("home.idle") && (
        <>
          <div className=' border-b px-8 py-4  flex space-x-8 mx-auto justify-around items-center '>
            <div className='flex self-center'>
              <Image width={100} height={100} alt='logo' src='/logo.png' />
            </div>
            <div className=' border border-gray-500 rounded cursor-pointer hover:underline px-4'>
              <button onClick={() => send("LOGOUT")}>logout</button>
            </div>
          </div>

          <HomePage />
        </>
      )}
    </div>
  );
}

export default Index;
