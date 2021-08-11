/** @format */

import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
const fetcher = (url) => fetch(url).then((r) => r.json());
function HomePage() {
  const { data, error, isValidating } = useSWR("/api/donors", fetcher);
  const [bloodGroup, setBloodGroup] = useState("");
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
      <div className='flex max-w-4xl mx-auto md:space-x-4   flex-wrap justify-center'>
        {data
          ?.filter((donor) =>
            bloodGroup ? donor?.bloodGroup === bloodGroup : donor
          )
          ?.map((donor) => (
            <Donor key={donor?.id} donor={donor} />
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
            <div className=' rounded sm:max-w-xs w-full mb-2'>
              <div className='flex max-w-xs w-full p-2 space-y-1  text-gray-700  capitalize flex-col'>
                <div className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
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
                  <p>{donor?.phone}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
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
          <div>
            <p className=' text-sm mb-1 mx-1 text-gray-500  italic'>
              Donation Equipments
            </p>
            <div className='flex flex-wrap'>
              {donor?.images?.map((image) => (
                <DonationItem key={image?.tag} image={image} />
              ))}
            </div>
          </div>
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
