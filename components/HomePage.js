/** @format */

import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
const fetcher = (url) => fetch(url).then((r) => r.json());
function HomePage() {
  const { data, error, isValidating } = useSWR("/api/donors", fetcher);
  const [bloodGroup, setBloodGroup] = useState("");
  return (
    <div className=' mt-4 mx-2 '>
      <div className='flex max-w-4xl mx-auto space-x-4    flex-wrap justify-end'>
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

      {!data && isValidating && <p>loading...</p>}
      <div className='flex max-w-4xl mx-auto space-x-4   flex-wrap justify-center'>
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
      className='text-gray-700 text-sm w-full rounded mb-4 shadow-lg  max-w-xs border    p-2'
      key={donor?._id}>
      <div className='flex flex-wrap max-w-sm w-full justify-between rounded items-center p-2  '>
        <div className='flex flex-col space-y-2 my-3'>
          <div className='flex space-x-3 text-2xl text-blue-600 font-semibold capitalize'>
            <p>{donor.firstName}</p>
            {/* <p>{donor.middleName}</p> */}
            <p>{donor.lastName}</p>
          </div>
          <p className='text-gray-700  bg-blue-50 inline-block  text-center capitalize'>
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
            <div className='my-2 border rounded  sm:max-w-xs w-full  '>
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
            </div>
            <div className='my-2 border rounded sm:max-w-xs w-full'>
              <div className=' bg-gray-100 p-2 my-0  text-gray-600 '>
                Contacts
              </div>
              <div className='flex max-w-xs w-full p-2 space-y-1 my-2 text-gray-700  capitalize flex-col'>
                <div className='flex justify-between'>
                  <p className='font-bold'>Phone</p>
                  <p>{donor?.phone}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='font-bold'>Email</p>
                  <p>{donor?.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className='mt-6 text-xl mb-1  italic text-center'>
              Donation Equipments
            </p>
            {donor?.images?.map((image) => (
              <div
                className='shadow p-2 flex items-center justify-between'
                key={image?.tag}>
                <Image width={150} height={150} alt='logo' src={image?.url} />
                <p className='text-blue-900 text-base capitalize font-medium'>
                  {image?.tag}
                </p>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
};
