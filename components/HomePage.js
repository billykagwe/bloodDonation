/** @format */

import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
const fetcher = (url) => fetch(url).then((r) => r.json());
function HomePage() {
  const { data, error, isValidating } = useSWR("/api/donors", fetcher);
 console.log({data})
  const [bloodGroup, setBloodGroup] = useState("");
  const groupData = data?.reduce((prev,curr) => {
    const bloodGroup = curr.bloodGroup
      return  prev[bloodGroup] ? {...prev,[bloodGroup]: prev[bloodGroup] += 1} : {...prev,[bloodGroup]: 1}
  },{})

  return (
    <div className=' mt-1 mx-2 '>
      <div className='flex max-w-4xl mx-auto sm:space-x-4  text-gray-600 text-sm   flex-wrap justify-center'>
        <select
          onChange={(e) => setBloodGroup(e.target.value)}
          name='bloodGroup'
          className='p-2 bg-white rounded border block  m-4'>
          <option value=''>Filter by Blood Group</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]?.map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      {!data && isValidating && <p className='text-center'>loading...</p>}
      <div className="flex space-x-2 mt-2 mb-8 items-center justify-center">
      {Object.keys(groupData).map(key => (
        <p className="flex items-center"><span className="text-yellow-600 font-bold text-2xl ">{key}</span>:<span className="text-gray-800 text-2xl ml-2" >{groupData[key]}</span></p>
      ))}
      </div>
      
      <div className='flex max-w-4xl mx-auto md:space-x-4   flex-wrap justify-center'>
        {data
          ?.filter((donor) =>
            bloodGroup ? donor?.bloodGroup === bloodGroup : donor
          )
          ?.map((donor) => (
            <Donor key={donor?._id} donor={donor} />
          ))}
      </div>
    </div>
  );
}

export default HomePage;

const Donor = ({ donor }) => {
  return (
    <div
      className='text-gray-700 text-sm w-full rounded mb-4 shadow-lg   sm:max-w-xs    p-2'
      key={donor?._id}>
      <div className='flex flex-wrap max-w-sm w-full justify-between rounded items-center p-2  '>
        <div className='flex flex-col  '>
          <div className='flex space-x-3 text-2xl text-blue-600 font-semibold capitalize'>
            <p>{donor.firstName}</p>
            {/* <p>{donor.middleName}</p> */}
            <p>{donor.lastName}</p>
          </div>
          <p className='text-gray-600 font-medium inline-block   capitalize'>
            {donor?.occupation}
          </p>
        </div>

        <div className='text-2xl p-1 rounded-full bg-red-50 text-center font-bold text-red-400'>
          {donor?.bloodGroup}
        </div>
      </div>

      {
        <>
          <div className='flex tracking-wide items-baseline justify-between flex-wrap'>
            {/* <div className='my-2 border rounded  sm:max-w-xs w-full  '>
              <div className=' bg-gray-100 p-2 my-0 '>Residence</div>
              <div className='flex max-w-sm w-full p-2 space-y-1 my-2 text-gray-700 capitalize  flex-col'>
                <div className='flex justify-between'>
                  <p className='font-semibold   inline-block mr-2'>City:</p>
                  <p> {donor?.city}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='font-semibold  text-gray-700  inline-block mr-2'>
                    Occupation:
                  </p>
                  <p>{donor?.occupation}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='font-semibold  text-gray-700  inline-block mr-2'>
                    Native Place:
                  </p>
                  <p>{donor?.nativePlace}</p>
                </div>
              </div>
            </div> */}
            <div className=' rounded sm:max-w-sm w-full mb-2'>
              <div className='flex w-full p-2 space-y-2  text-blue-500  capitalize flex-col'>
                <div className='flex flex-col space-y-2  '>
                  <div className="flex items-center space-x-2">
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-black'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                  <p>{donor?.contactPhone}</p>
                  </div>
                <div className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-black" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path fill-rule="nonzero" d="M7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8c0 1.436.377 2.813 1.084 4.024l.422.724-.653 2.401 2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004.054.004.108.01.162.016.159.018.334.115.393.249.298.676.588 1.357.868 2.04.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268.12.116.237.235.363.346.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265.004.067.01.175-.013.373-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302 2.378 2.378 0 0 1-.33.288 3.71 3.71 0 0 1-.125.09 5.024 5.024 0 0 1-.383.22 1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z"/>
                    </g>
                </svg>
                <p> {donor?.whatsappPhone}</p>
                </div>
                 
                </div>
                <div className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-black'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                  </svg>
                  <p>{donor?.email}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <p className=' text-sm mb-1 mx-1 text-gray-500  italic'>
              Donation Equipments
            </p>
            <div className='flex flex-wrap'>
              {donor?.images?.map((image) => (
                <DonationItem key={image?.tag} image={image} />
              ))}
            </div>
          </div> */}
        </>
      }
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DonationItem = ({ image }) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <div
      className='shadow p-1 flex items-center justify-between'
      key={image?.tag}>
      {!!showImage && (
        <div
          className='fixed z-10 inset-0 overflow-y-auto'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='trues'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
            <div
              className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
              aria-hidden='true'></div>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'>
              &#8203;
            </span>

            {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div
                onClick={() => setShowImage(false)}
                className='flex justify-center items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 inline-block m-5 '
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </div>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Image height={300} width={300} alt='logo' src={image?.url} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <p
        onClick={() => setShowImage(true)}
        className='text-blue-500 tracking-wide text-sm bg-blue-50 inline-block  capitalize cursor-pointer hover:bg-blue-200 '>
        {image?.tag}
      </p>
    </div>
  );
};
