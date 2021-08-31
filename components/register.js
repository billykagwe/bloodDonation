/** @format */

import { useMachine } from "@xstate/react";
import { useState } from "react";
import { Task } from "../utils/types";
import { PromiseMachine } from "../machine/Promise.Machine";
import Image from "next/image";
import Head from "next/head";

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
  return (
    <>
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
      <div className='container-wrapper font-medium register mx-auto max-w-4xl'>
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
          <div className=' flex justify-center' disabled>
            <Image
              alt='loading...'
              height={200}
              width={200}
              src='/spinner.svg'
              className='block'
            />
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
                  <div className='mt-2 text-sm bg-white text-gray-500'>
                    <span className=' block'>
                      Thank you for filling out the registration form.
                    </span>
                    <span>Please check your email inbox.</span>
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
                <p className='text-gray-200  text-lg  tracking-wide my-2 font-bold mb-4'>
                  Dear Well wisher,
                  <p className=' border-l-2 font-light pl-2 border-blue-300 rounded tracking-wide my-2 text-gray-200 text-lg  mb-4'>
                    Please fill the following form that asks for your personal
                    and health related information. Please note this data will
                    only be used creating a database for blood donors in our
                    community.
                  </p>
                </p>
              </div>

              <div className='names border-b'>
                <div className='mt-1 '>
                  <label className='text-xs text-blue-100'>First Name *</label>
                  <input
                    onChange={formDataChange}
                    name='firstName'
                    type='text'
                    className='p-2 rounded w-full text-blue-800 font-medium '
                  />
                </div>
                <div className='mt-1 '>
                  <label className='text-xs text-blue-100'>Middle Name *</label>

                  <input
                    onChange={formDataChange}
                    name='middleName'
                    type='text'
                    className='p-2 rounded w-full text-blue-800 font-medium '
                  />
                </div>
                <div className='mt-1 '>
                  <label className='text-xs text-blue-100'>Last Name *</label>

                  <input
                    onChange={formDataChange}
                    name='lastName'
                    type='text'
                    className='p-2 rounded w-full text-blue-800 font-medium '
                  />
                </div>
                <div className='mt-1 '>
                  <label className='text-xs text-blue-100'>Occupation *</label>

                  <input
                    onChange={formDataChange}
                    name='occupation'
                    type='text'
                    className='p-2 rounded w-full text-blue-800 font-medium '
                  />
                </div>
              </div>
            </div>

            <div className='border-b section'>
              <p className='text-gray-200 text-lg  tracking-wide my-2 font-light mb-4'>
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
              <p className='text-gray-200 text-lg  tracking-wide my-2 font-light mb-4'>
                Date of Birth
              </p>
              <div className='birthdate-input'>
                <input
                  onChange={formDataChange}
                  name='day'
                  className='numberInput text-blue-800'
                  type='number'
                  placeholder='Day'
                />
                <select
                  className='text-blue-800'
                  name='month'
                  onChange={formDataChange}>
                  <option>Month</option>
                  {months?.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                <input
                  onChange={formDataChange}
                  className='numberInput text-blue-800'
                  type='number'
                  name='year'
                  placeholder='Year'
                />
              </div>
              <span>E.g 12 October 1983</span>
            </div>
            <div className='contact section'>
              <div className='mt-1 text-blue-100'>
                <label className='text-xs text-blue-100'>Email</label>
                <input
                  className='p-2 rounded w-full text-blue-800 font-medium'
                  onChange={formDataChange}
                  name='email'
                  type='text'
                />
              </div>
              <div className='mt-1 '>
                <label className='text-xs text-blue-100'>
                  Contact Phone Number
                </label>
                <input
                  className='p-2 rounded w-full text-blue-800 font-medium'
                  onChange={formDataChange}
                  name='contactPhone'
                  type='number'
                  value={formData.contactPhone}
                />
              </div>
              <div className='mt-1'>
                <label className='text-xs text-blue-100'>
                  Whatsapp Phone Number
                </label>
                <input
                  className='p-2 rounded w-full text-blue-800 font-medium'
                  onChange={formDataChange}
                  name='whatsappPhone'
                  type='number'
                  value={formData.whatsappPhone}
                />
              </div>
            </div>
            <div className='section'>
              <div className='mt-1 '>
                <label className='text-xs text-blue-100'>
                  Select Blood Group
                </label>
                <select
                  onChange={formDataChange}
                  name='bloodGroup'
                  className='blood-group bg-white rounded w-full text-sm '>
                  <option value='t'>Blood Groups</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]?.map(
                    (val) => (
                      <option value={val} key={val}>
                        {val}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className='section'>
              <p className='text-gray-200 text-lg  tracking-wide my-2 font-light mb-4'>
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
                    className='checkbox '
                    onChange={formDataChange}
                    type='checkbox'
                  />
                </div>
              </div>
            </div>
            <div className='contact border-b section'>
              <div className='mt-1'>
                <label className='text-xs text-blue-100'>Current City *</label>
                <input
                  onChange={formDataChange}
                  name='city'
                  type='text'
                  className='p-2 rounded w-full text-blue-800 font-medium'
                />
              </div>
              <div className='mt-1'>
                <label className='text-xs text-blue-100'>County</label>

                <input
                  onChange={formDataChange}
                  name='county'
                  type='text'
                  className='p-2 rounded w-full text-blue-800 font-medium'
                />
              </div>
            </div>

            <div className='section'>
              <p className='text-gray-200 text-lg  tracking-wide my-2 font-light mb-4'>
                Do you have any of the following health equipments which can be
                lent to the community members when they are in need?
              </p>
              <div className='contact border-b  text-white'>
                <Equipment
                  label='Stretcher'
                  name={"stretcher"}
                  imageInput={imageInput}
                />
                <Equipment
                  label='A medical Bed'
                  name={"medicalBed"}
                  imageInput={imageInput}
                />
                <Equipment
                  label='Adult Walker'
                  name={"adultWalker"}
                  imageInput={imageInput}
                />
                <div className='equipments'>
                  <span>Oxygen Concentrator</span>
                  <span className='italic text-sm'>Please upload a photo</span>
                  <input
                    className='max-w-sm w-full'
                    onChange={imageInput}
                    name='oxygenContentrator'
                    type='file'
                  />
                  <div className='flex items-center'>
                    <div className=' flex items-baseline mr-3'>
                      <label>5 ltr</label>
                      <input
                        name='nebulizerType'
                        type='radio'
                        className='w-10 '
                        value='5 ltr'
                        checked={formData.nebulizerType === "5 ltr"}
                        onChange={formDataChange}
                      />
                    </div>
                    <div className='radio flex items-baseline mr-3'>
                      <label> 7 Ltr</label>
                      <input
                        name='nebulizerType'
                        type='radio'
                        className='w-10 '
                        value='7 ltr'
                        checked={formData.nebulizerType === "7 ltr"}
                        onChange={formDataChange}
                      />
                    </div>
                    <div className='radio flex items-baseline mr-3 '>
                      <label className=''> 10 ltr</label>
                      <input
                        name='nebulizerType'
                        className='w-10 '
                        type='radio'
                        value='10 ltr'
                        checked={formData.nebulizerType === "10 ltr"}
                        onChange={formDataChange}
                      />
                    </div>
                  </div>
                </div>

                <Equipment
                  label='Nebulizer'
                  name={"nebulizer"}
                  imageInput={imageInput}
                />
                <Equipment
                  name='babyCrib'
                  label={"A Baby Crib"}
                  imageInput={imageInput}
                />
              </div>
            </div>
            <p className='mb-3 mt-5 text-gray-900 font-medium'>
              I hereby declare the information provided by me is correct and
              best of my knowledge
            </p>

            <div className='text-gray-700 font-light flex space-y-2 flex-col '>
              <p>
                <PointIcon />
                Team Oshwal Care will use this information provided by the user
                as it ifor the purposes of helping the needy for their relevant
                requirements
              </p>
              <p>
                <PointIcon />
                This information will not be used for any commercial benefit.
                The purpose of this initiative is to help each other during
                need.
              </p>
              <p>
                <PointIcon />
                Information of blood group in this form does not qualify a donor
                to donate blood to the needy patient. The donor must produce all
                his information to the doctor and seek further guidance on
                eligibility to donate or not at every instance of blood donation
              </p>
              <p>
                <PointIcon />
                Team Oshwal Care is only responsible to pass on the information
                as shared by the user on this form. It is the responsibility of
                the donor and the party seeking help from the donor to verify
                each other’s information before engaging in any transaction.
              </p>
            </div>

            {state.context.error && (
              <p style={{ color: "red" }}>{state.context.error}</p>
            )}
            <button
              onClick={() =>
                send({ type: "SUBMIT", data: { formData, equipmentImages } })
              }
              className='submit mt-8 block rounded p-2 w-full text-center bg-blue-600 '>
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}

///////////////////////////////////////////////////////////////////////////////

const Equipment = ({ label, imageInput, name }) => {
  return (
    <div className='equipments'>
      <span>{label}</span>
      <span className='italic text-sm text-blue-400'>
        Please upload a photo
      </span>
      <input
        className='max-w-sm w-full text-sm my-2'
        onChange={imageInput}
        name={name}
        type='file'
      />
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////
const PointIcon = () => {
  return (
    <span className='block mb-2 mt-4'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        />
      </svg>
    </span>
  );
};

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
