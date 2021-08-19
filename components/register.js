/** @format */

import { useMachine } from "@xstate/react";
import { useState } from "react";
import { Task } from "../utils/types";
import { PromiseMachine } from "../machine/Promise.Machine";
import Image from "next/image";

export default function Register() {
  const [formData, setFormData] = useState({ phone: "+254" });
  const [equipmentImages, setEquipmentImages] = useState({});

  const formDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const imageInput = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setEquipmentImages({ ...equipmentImages, [name]: file });
  };

  const [state, send] = useMachine(PromiseMachine(operation));
  console.log(state.context.error);
  return (
    <>
      <div className='container-wrapper register mx-auto max-w-4xl'>
        <div className='flex flex-col items-center justify-center mt-3'>
          <Image width={150} height={150} alt='logo' src='/logo.png' />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <h2 style={{ marginTop: "10px" }}>
            Blood Donors Data Collection Form
          </h2>
        </div>

        {state.matches("loading") && (
          <div
            type='button'
            className='bg-rose-600 mx-auto text-blue-700'
            disabled>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 inline-block animate-spin'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span className='mx-3 text-lg'>Submitting </span>
          </div>
        )}
        {state.matches("error") && (
          <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg
                    className='h-6 w-6 text-red-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='modal-title'>
                    Registration Failed
                  </h3>
                  <div className='mt-2'>
                    <span className='text-sm text-gray-500'>
                      A user with a similar email address already exists. Please
                      use a different email or contact admin
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => send({ type: "RETRY" })}
                className='block mx-auto bg-red-100 mt-2 text-red-500 p-1 rounded  w-32 font-semibold tracking-wide hover:bg-red-200'>
                RETRY
              </button>
            </div>
          </div>
        )}
        {/* some comments */}
        {state.matches("success") && (
          <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    className='text-lg text-green-600 leading-6 font-medium '
                    id='modal-title'>
                    Registration Completed Successfully
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Thank you for filling out the registration form. Please
                      check your email inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {state.matches("idle") && (
          <div className='max-w-4xl w-full mx-auto '>
            <div className='section'>
              <div className='section-label'>
                <p>
                  Dear Well wisher,
                  <p>
                    Please fill the following form that asks for your personal
                    and health related information. Please note this data will
                    only be used creating a database for blood donors in our
                    community.
                  </p>
                </p>
              </div>
              {/* 
            <div className='names border-b'>
              <p>V.O.C Membership Number</p>
              <input
                style={{ marginTop: 0 }}
                onChange={formDataChange}
                className=''
                type='number'
                name='year'
              />
            </div> */}

              <div className='names border-b'>
                <input
                  onChange={formDataChange}
                  name='firstName'
                  type='text'
                  placeholder='First Name *'
                />
                <input
                  onChange={formDataChange}
                  name='middleName'
                  type='text'
                  placeholder='Middle Name *'
                />
                <input
                  onChange={formDataChange}
                  name='lastName'
                  type='text'
                  placeholder='Last Name *'
                />
                <input
                  onChange={formDataChange}
                  name='occupation'
                  type='text'
                  placeholder='Occupation *'
                />
              </div>
            </div>

            <div className='border-b section'>
              <p>
                If you are a doctor or in any medical related proffesion, would
                you like to volunteer for your services to the community when
                needed.
              </p>
              <div className='docter-checkbox'>
                <div>
                  <label>Yes</label>
                  <input
                    name='doctor'
                    value='yes'
                    onChange={formDataChange}
                    type='checkbox'
                    className='checkbox'
                  />
                </div>
                <div>
                  <label>No</label>
                  <input
                    name='doctor'
                    value='no'
                    onChange={formDataChange}
                    type='checkbox'
                    className='checkbox'
                  />
                </div>
              </div>
            </div>

            <div className='birthdate border-b section'>
              <p> Date of Birth</p>
              <div className='birthdate-input'>
                <input
                  onChange={formDataChange}
                  name='day'
                  className='numberInput'
                  type='number'
                  placeholder='Day'
                />
                <select
                  className='text-black'
                  name='month'
                  onChange={formDataChange}>
                  <option>Month</option>
                  {months?.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                <input
                  onChange={formDataChange}
                  className='numberInput'
                  type='number'
                  name='year'
                  placeholder='Year'
                />
              </div>
              <span>E.g 12 October 1983</span>
            </div>
            <div className='contact section'>
              <input
                onChange={formDataChange}
                name='email'
                type='text'
                placeholder='Email address'
              />
              <input
                onChange={formDataChange}
                name='phone'
                type='text'
                value={formData.phone}
                placeholder='+254 Mobile number'
              />
              <select
                onChange={formDataChange}
                name='bloodGroup'
                className='blood-group'>
                <option value=''>Select Blood Group (required)</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]?.map(
                  (val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className='section'>
              <p>
                Will you volunteer for blood donation when there is a
                requirement for your blood group. A Team Oshwal Care Member will
                call/message you and check your availablity.
              </p>
              <div className='docter-checkbox border-b'>
                <div>
                  <label>Yes</label>
                  <input
                    name='willingVolunteer'
                    value='no'
                    className='checkbox'
                    type='checkbox'
                    onChange={formDataChange}
                  />
                </div>
                <div>
                  <label>No</label>
                  <input
                    name='willingVolunteer'
                    value={"no"}
                    className='checkbox'
                    onChange={formDataChange}
                    type='checkbox'
                  />
                </div>
              </div>
            </div>
            <div className='contact border-b section'>
              <input
                onChange={formDataChange}
                name='city'
                type='text'
                placeholder='Current City'
              />
              <input
                onChange={formDataChange}
                name='county'
                type='text'
                placeholder='County'
              />
              <input
                name='nativePlace'
                type='text'
                onChange={formDataChange}
                placeholder='Native Place in India'
              />
            </div>
            <div className='section'>
              <p>
                Do you have any of the following health equipments which can be
                lent to the community members when they are in need?
              </p>
              <div className='contact border-b  text-white'>
                <div className='equipments'>
                  <span>Stretcher</span>{" "}
                  <span className='italic text-sm'>Please upload a photo</span>
                  <input onChange={imageInput} name='stretcher' type='file' />
                </div>
                <div className='equipments'>
                  <span>A Medical Bed</span>
                  <span className='italic text-sm'>Please upload a photo</span>
                  <input onChange={imageInput} name='medicalBed' type='file' />
                </div>
                <div className='equipments'>
                  <span>Adult Walker</span>
                  <span className='italic text-sm'>Please upload a photo</span>
                  <input onChange={imageInput} name='adultWalker' type='file' />
                </div>
                <div className='equipments'>
                  <span>Oxygen Concentrator</span>
                  <span className='italic text-sm'>Please upload a photo</span>
                  <input
                    onChange={imageInput}
                    name='oxygenContentrator'
                    type='file'
                  />
                </div>
                <div className='equipments'>
                  <span>Nebulizer</span>
                  <span className='italic text-sm'>Please upload a photo</span>
                  <input onChange={imageInput} name='nebulizer' type='file' />
                </div>
                <div className='equipments'>
                  <span>A Baby Crib</span>
                  <span className='italic text-sm'>Please upload a photo</span>
                  <input onChange={imageInput} name='babyCrib' type='file' />
                </div>
              </div>
            </div>
            <p style={{ color: "blue" }}>
              I hereby declare the information provided by me is correct and
              best of my knowledge
            </p>

            {state.context.error && (
              <p style={{ color: "red" }}>{state.context.error}</p>
            )}
            <button
              onClick={() =>
                send({ type: "SUBMIT", data: { formData, equipmentImages } })
              }
              className='submit'>
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}

//////////////////////////////////////////////////////////////////////////////////////
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const uploadSingleImage = (file, formData, tag) => {
  formData.append("file", file);
  formData.append("upload_preset", "sek0yrbv");
  formData.append("tags", [tag]);
  return fetch(`https://api.cloudinary.com/v1_1/dzapj0umu/upload`, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const uploadImages = (files) => {
  const formData = new FormData();

  const imagePromise = Object.keys(files).map((key) =>
    uploadSingleImage(files[key], formData, key)
  );

  return imagePromise;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const uploadCloudinaryImages = (equipmentImages) =>
  Task((rej, res) =>
    Promise.all(uploadImages(equipmentImages)).then(res).catch(rej)
  );

const postForm = (formData, images) =>
  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ ...formData, images }),
  }).then((res) => res.json());

const submitFormData = (formData) => (images) =>
  Task((rej, res) => postForm(formData, images).then(res).catch(rej));

const parseImages = (images) =>
  images?.map(({ url, tags }) => ({ url, tag: tags[0] }));

const operation = ({ equipmentImages, formData }) =>
  uploadCloudinaryImages(equipmentImages)
    .map(parseImages)
    .chain(submitFormData(formData))
    .fork(
      (x) => x,
      (x) => x
    );
