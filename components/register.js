/** @format */

import { useMachine } from "@xstate/react";
import { useState } from "react";
import { Task } from "../utils/types";
import { PromiseMachine } from "../machine/Promise.Machine";
import Image from "next/image";
import Head from "next/head";

export default function Register() {
  const [formData, setFormData] = useState({
    phone: "+254",
    contactCode: "+254	🇰🇪	KE",
    whatsAppCode: "+254	🇰🇪	KE",
  });
  const [equipmentImages, setEquipmentImages] = useState({});
  console.log({ formData });
  const formDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const imageInput = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setEquipmentImages({ ...equipmentImages, [name]: file });
  };

  const [state, send] = useMachine(PromiseMachine(postForm));
  const [agreed, setAgreed] = useState(false);
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
      <main className='bg-gray-50'>
        <div className='p-4  font-medium register mx-auto max-w-4xl bg-white'>
          <div className='flex flex-col items-center justify-center pt-3'>
            <Image width={150} height={150} alt='logo' src='/logo.png' />
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
                        A user with a similar email address already exists.
                        Please use a different email or contact admin
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
                      <span>Please also check your junk email box.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {state.matches("idle") && (
            <div className='max-w-xl w-full mx-auto  '>
              <div className=' my-4 border-t  '>
                <p className='text-gray-800 text-xl  tracking-wide font-semibold'>
                  Dear Well Wisher
                </p>

                <p className=' text-gray-800 font-medium  text-md  leading-6 mt-2      '>
                  Please fill the following form for creating a data bank for
                  blood donors.
                </p>
                <p className=' text-gray-800 font-medium  text-md  leading-6 mt-1      '>
                  Please note that this data will only be used for the above
                  purpose intended.
                </p>
              </div>
              <DonationRequirements />
              <div className=''>
                <div className=' border-b'>
                  <div className='mt-1 '>
                    <label className='text-xs'>First Name *</label>
                    <input
                      onChange={formDataChange}
                      name='firstName'
                      type='text'
                      className='p-2 rounded w-full border border-gray-500 block mt-1 text-gray-800 font-medium '
                    />
                  </div>
                  <div className='mt-2 '>
                    <label className='text-xs '>Middle Name *</label>

                    <input
                      onChange={formDataChange}
                      name='middleName'
                      type='text'
                      className='p-2 rounded w-full border border-gray-500  text-blue-800 font-medium '
                    />
                  </div>
                  <div className='mt-2'>
                    <label className='text-xs '>Last Name *</label>

                    <input
                      onChange={formDataChange}
                      name='lastName'
                      type='text'
                      className='p-2 rounded w-full border border-gray-500  text-blue-800 font-medium '
                    />
                  </div>
                  <div className='mt-2 '>
                    <label className='text-xs '>Occupation *</label>

                    <input
                      onChange={formDataChange}
                      name='occupation'
                      type='text'
                      className='p-2 rounded w-full border border-gray-500  text-blue-800 font-medium '
                    />
                  </div>
                </div>
              </div>

              {/* <div className='border-b '>
              <p className='text--200 text-lg  tracking-wide my-2 font-light mb-4'>
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
            </div> */}

              <div className=' border-b mt-8 '>
                <p className='text-gray-800 text-lg   tracking-wide font-semibold'>
                  Date of Birth
                </p>
                <div className='flex items-center bg-whte space-x-3'>
                  <input
                    onChange={formDataChange}
                    name='day'
                    className='numberInput text-blue-800'
                    type='number'
                    placeholder='Day'
                  />
                  <select
                    className='text-blue-800 bg-white block border py-3 px-2 border-gray-700 rounded'
                    name='month'
                    onChange={formDataChange}>
                    <option>Month</option>
                    {months?.map((month) => (
                      <option className='py-4' key={month}>
                        {month}
                      </option>
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
              <div className=' '>
                <div className='mt-1'>
                  <label className=' text-gray-800    tracking-wide font-semibold'>
                    Email
                  </label>
                  <input
                    className='p-2 rounded w-full border border-gray-700 block mt-1 text-blue-800 font-medium'
                    onChange={formDataChange}
                    name='email'
                    type='text'
                  />
                </div>
                <div className='mt-6 '>
                  <label className=' text-gray-800    tracking-wide font-semibold '>
                    Contact Phone Number
                  </label>
                  <div className='flex space-x-2 mt-2 '>
                    <ul className=' h-12 overflow-scroll border'>
                      {codes?.map((code) => (
                        <li key={code}> {code}</li>
                      ))}
                    </ul>
                    <input
                      className='p-2 rounded w-full text-blue-800 border border-gray-700 font-medium'
                      onChange={formDataChange}
                      name='contactPhone'
                      type='number'
                      value={formData.contactPhone}></input>
                  </div>
                </div>
                <div className='mt-6'>
                  <label className='text-gray-800    tracking-wide font-semibold '>
                    Whatsapp Phone Number
                  </label>
                  <input
                    className='p-2 rounded w-full block mt-2 border border-gray-700   text-blue-800 font-medium'
                    onChange={formDataChange}
                    name='whatsappPhone'
                    type='number'
                    value={formData.whatsappPhone}
                  />
                </div>
              </div>
              <div className=' mt-6'>
                <div className='mt-1 '>
                  <label className=' text-gray-800   tracking-wide font-semibold'>
                    Select Blood Group
                  </label>
                  <select
                    onChange={formDataChange}
                    name='bloodGroup'
                    className=' bg-white border border-gray-700 p-3 block mt-2 rounded w-full text-sm '>
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
              <div className=' mt-12'>
                <p className='text-gray-800 text-base tracking-wide  font-semibold'>
                  Will you volunteer for blood donation when there is a
                  requirement for your blood group. A Member from Team Oshwal
                  Care will contact you for the same.
                </p>
                <div className='flex space-x-4 mt-3 items-center border-b'>
                  <div className='flex items-center'>
                    <label>Yes</label>
                    <input
                      name='willingVolunteer'
                      value='no'
                      className='checkbox'
                      type='checkbox'
                      onChange={formDataChange}
                    />
                  </div>
                  <div className='flex items-center'>
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
              <div className=' border-b '>
                <div className='mt-2'>
                  <label className='text-gray-800 block mt-1   tracking-wide font-semibold'>
                    Current City *
                  </label>
                  <input
                    onChange={formDataChange}
                    name='city'
                    type='text'
                    className='p-2 rounded w-full border border-gray-700  font-medium'
                  />
                </div>
                <div className='mt-4'>
                  <label className='text-gray-800  block mt-1  tracking-wide font-semibold'>
                    County
                  </label>

                  <input
                    onChange={formDataChange}
                    name='county'
                    type='text'
                    className='p-2 rounded w-full border border-gray-700  font-medium'
                  />
                </div>
              </div>
              {/* 
            <div className=''>
              <p className='text-white text-lg  tracking-wide my-2 font-light mb-4'>
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
                <OxygenConcentrator
                  imageInput={imageInput}
                  formData={formData}
                  formDataChange={formDataChange}
                />
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
            </div> */}
              <p className='mb-6 text-4xl italic underline  mt-10 text-gray-900 font-medium'>
                Disclaimer
              </p>

              <div className='text-gray-600 text-normal leading-8  font-normal  flex space-y-4 flex-col '>
                <div className='flex space-x-3'>
                  <p>
                    <span className='text-3xl'>T</span>he information given by
                    you will be used in the same format by team Oshwal Care for
                    the purpose of helping the needy as per their requirements.
                  </p>
                </div>
                <p>
                  <span className='text-3xl'>T</span>his information will not be
                  used for any commercial benefit. The purpose of this
                  initiative is to help each other during need.
                </p>
                <p>
                  <span className='text-3xl'>Y</span>our information in this
                  form does not qualify for you to donate blood to the needy
                  patient.
                </p>
                <p>
                  <span className='text-3xl'>I</span>t is the responsibility of
                  the donor and the person seeking help from the donor to verify
                  each other’s information before engaging in any transaction.
                  Team Oshwal Care will just share the information as provided
                  by the user of this platform. Team Oshwal Care is not liable
                  for any false or incorrect information.
                </p>
              </div>

              <div className='mt-8 flex items-center space-x-4 '>
                <input
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className='h-8 w-8'
                  type='checkbox'
                />
                <p className=' text-gray-900 inline-block    '>
                  The information provided by me is correct and I have read all
                  the points mentioned in the disclaimer
                </p>
              </div>

              {state.context.error && (
                <p style={{ color: "red" }}>{state.context.error}</p>
              )}
              <button
                onClick={() =>
                  send({ type: "SUBMIT", data: { formData, equipmentImages } })
                }
                className={`submit mt-8 block rounded p-2 w-full text-center ${
                  agreed ? "bg-blue-600" : "bg-gray-200"
                } text-white `}>
                Submit
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////

const OxygenConcentrator = ({ imageInput, formData, formDataChange }) => {
  const [show, setShow] = useState();
  return (
    <div className=' border rounded border-blue-400'>
      <div
        onClick={() => setShow(!show)}
        className='p-2 flex justify-between cursor-pointer '>
        <span>Oxygen Concentrator</span>
        <input
          className='h-4 w-4'
          type='checkbox'
          onChange={() => setShow(!show)}
        />
      </div>
      {show && (
        <div className='mx-2'>
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
      )}
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////

const Equipment = ({ label, imageInput, name }) => {
  const [show, setShow] = useState(false);
  return (
    <div className='equipments border rounded border-blue-400'>
      <div
        onClick={() => setShow(!show)}
        className='p-2 flex justify-between cursor-pointer '>
        <span>{label}</span>
        <input
          className='h-4 w-4'
          type='checkbox'
          onChange={() => setShow(!show)}
        />
      </div>
      {show && (
        <div className=''>
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
      )}
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////
const DonationRequirements = () => {
  return (
    <div className='font-normal mb-4'>
      <p className=' text-gray-700 text-lg font-semibold mt-2 '>
        You can only donate blood if:
      </p>
      <ol className='list-disc p-2 px-4 text-gray-800   flex space-y-2 flex-col'>
        <li>Fit and healthy</li>
        <li>Between age 18 and 55 years</li>
        <li>Weight is more than 50 kgs</li>
        <li>Its been more than 6 months since you got a tatoo</li>
        <li>Taking anti-depressants at the normal prescribed doses</li>
        <li>Taking blood medications and blood pressure is stable</li>
      </ol>
    </div>
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

const postForm = (formData) => {
  console.log({ formData });
  const data = parseFormData(formData);
  return fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
};

const parseFormData = ({ formData }) => {
  console.log({ formData });
  const {
    contactCode,
    contactPhone,
    whatsappPhone,
    whatsAppCode,
    ...otherFormData
  } = formData;
  let parsedData = otherFormData;
  if (contactCode && contactPhone) {
    parsedData = {
      ...parsedData,
      contactPhone: `${contactCode.split("\t")[0]} ${contactPhone}`,
    };
  }

  if (whatsAppCode && whatsappPhone) {
    parsedData = {
      ...parsedData,
      whatsappPhone: `${whatsAppCode.split("\t")[0]} ${whatsappPhone}`,
    };
  }

  return parsedData;
};

const submitFormData = (formData) => {
  console.log({ f: formData });
  return Task((rej, res) => postForm(formData).then(res).catch(rej));
};
const parseImages = (images) =>
  images?.map(({ url, tags }) => ({ url, tag: tags[0] }));

const codes = [
  "+1	🇨🇦",
  "+1	🇺🇸",
  "+1242	🇧🇸",
  "+1246	🇧🇧",
  "+1264	🇦🇮",
  "+1268	🇦🇬",
  "+1284	🇻🇬",
  "+1340	🇻🇮",
  "+1441	🇧🇲",
  "+1473	🇬🇩",
  "+1649	🇹🇨",
  "+1664	🇲🇸",
  "+1670	🇲🇵",
  "+1671	🇬🇺",
  "+1684	🇦🇸",
  "+1758	🇱🇨",
  "+1767	🇩🇲",
  "+1784	🇻🇨",
  "+1849	🇩🇴",
  "+1868	🇹🇹",
  "+1869	🇰🇳",
  "+1876	🇯🇲",
  "+1939	🇵🇷",
  "+20	🇪🇬	EG",
  "+211	🇸🇸	SS",
  "+212	🇲🇦	MA",
  "+213	🇩🇿	DZ",
  "+216	🇹🇳	TN",
  "+218	🇱🇾	LY",
  "+220	🇬🇲	GM",
  "+221	🇸🇳	SN",
  "+222	🇲🇷	MR",
  "+223	🇲🇱	ML",
  "+224	🇬🇳	GN",
  "+225	🇨🇮	CI",
  "+226	🇧🇫	BF",
  "+227	🇳🇪	NE",
  "+228	🇹🇬	TG",
  "+229	🇧🇯	BJ",
  "+230	🇲🇺	MU",
  "+231	🇱🇷	LR",
  "+232	🇸🇱	SL",
  "+233	🇬🇭	GH",
  "+234	🇳🇬	NG",
  "+235	🇹🇩	TD",
  "+236	🇨🇫	CF",
  "+237	🇨🇲	CM",
  "+238	🇨🇻	CV",
  "+239	🇸🇹	ST",
  "+240	🇬🇶	GQ",
  "+241	🇬🇦	GA",
  "+242	🇨🇬	CG",
  "+243	🇨🇩	CD",
  "+244	🇦🇴	AO",
  "+245	🇬🇼	GW",
  "+246	🇮🇴	IO",
  "+248	🇸🇨	SC",
  "+249	🇸🇩	SD",
  "+250	🇷🇼	RW",
  "+251	🇪🇹	ET",
  "+252	🇸🇴	SO",
  "+253	🇩🇯	DJ",
  "+255	🇹🇿	TZ",
  "+256	🇺🇬	UG",
  "+257	🇧🇮	BI",
  "+258	🇲🇿	MZ",
  "+260	🇿🇲	ZM",
  "+261	🇲🇬	MG",
  "+262	🇹🇫	TF",
  "+262	🇾🇹	YT",
  "+262	🇷🇪	RE",
  "+263	🇿🇼	ZW",
  "+264	🇳🇦	NA",
  "+265	🇲🇼	MW",
  "+266	🇱🇸	LS",
  "+267	🇧🇼	BW",
  "+268	🇸🇿	SZ",
  "+269	🇰🇲	KM",
  "+27	🇿🇦	ZA",
  "+290	🇸🇭	SH",
  "+291	🇪🇷	ER",
  "+297	🇦🇼	AW",
  "+298	🇫🇴	FO",
  "+299	🇬🇱	GL",
  "+30	🇬🇷	GR",
  "+31	🇳🇱	NL",
  "+32	🇧🇪	BE",
  "+33	🇫🇷	FR",
  "+34	🇪🇸	ES",
  "+345	🇰🇾	KY",
  "+350	🇬🇮	GI",
  "+351	🇵🇹	PT",
  "+352	🇱🇺	LU",
  "+353	🇮🇪	IE",
  "+354	🇮🇸	IS",
  "+355	🇦🇱	AL",
  "+356	🇲🇹	MT",
  "+357	🇨🇾	CY",
  "+358	🇦🇽	AX",
  "+358	🇫🇮	FI",
  "+359	🇧🇬	BG",
  "+36	🇭🇺	HU",
  "+370	🇱🇹	LT",
  "+371	🇱🇻	LV",
  "+372	🇪🇪	EE",
  "+373	🇲🇩	MD",
  "+374	🇦🇲	AM",
  "+375	🇧🇾	BY",
  "+376	🇦🇩	AD",
  "+377	🇲🇨	MC",
  "+378	🇸🇲	SM",
  "+379	🇻🇦	VA",
  "+380	🇺🇦	UA",
  "+381	🇷🇸	RS",
  "+382	🇲🇪	ME",
  "+383	🇽🇰	XK",
  "+385	🇭🇷	HR",
  "+386	🇸🇮	SI",
  "+387	🇧🇦	BA",
  "+389	🇲🇰	MK",
  "+39	🇮🇹	IT",
  "+40	🇷🇴	RO",
  "+41	🇨🇭	CH",
  "+420	🇨🇿	CZ",
  "+421	🇸🇰	SK",
  "+423	🇱🇮	LI",
  "+43	🇦🇹	AT",
  "+44	🇬🇬	GG",
  "+44	🇮🇲	IM",
  "+44	🇯🇪	JE",
  "+44	🇬🇧	GB",
  "+45	🇩🇰	DK",
  "+46	🇸🇪	SE",
  "+47	🇧🇻	BV",
  "+47	🇳🇴	NO",
  "+47	🇸🇯	SJ",
  "+48	🇵🇱	PL",
  "+49	🇩🇪	DE",
  "+500	🇫🇰	FK",
  "+500	🇬🇸	GS",
  "+501	🇧🇿	BZ",
  "+502	🇬🇹	GT",
  "+503	🇸🇻	SV",
  "+504	🇭🇳	HN",
  "+505	🇳🇮	NI",
  "+506	🇨🇷	CR",
  "+507	🇵🇦	PA",
  "+508	🇵🇲	PM",
  "+509	🇭🇹	HT",
  "+51	🇵🇪	PE",
  "+52	🇲🇽	MX",
  "+53	🇨🇺	CU",
  "+54	🇦🇷	AR",
  "+55	🇧🇷	BR",
  "+56	🇨🇱	CL",
  "+57	🇨🇴	CO",
  "+58	🇻🇪	VE",
  "+590	🇬🇵	GP",
  "+590	🇧🇱	BL",
  "+590	🇲🇫	MF",
  "+591	🇧🇴	BO",
  "+592	🇬🇾	GY",
  "+593	🇪🇨	EC",
  "+594	🇬🇫	GF",
  "+595	🇵🇾	PY",
  "+596	🇲🇶	MQ",
  "+597	🇸🇷	SR",
  "+598	🇺🇾	UY",
  "+599		AN",
  "+60	🇲🇾	MY",
  "+61	🇦🇺	AU",
  "+61	🇨🇽	CX",
  "+61	🇨🇨	CC",
  "+62	🇮🇩	ID",
  "+63	🇵🇭	PH",
  "+64	🇳🇿	NZ",
  "+64	🇵🇳	PN",
  "+65	🇸🇬	SG",
  "+66	🇹🇭	TH",
  "+670	🇹🇱	TL",
  "+672	🇦🇶	AQ",
  "+672	🇭🇲	HM",
  "+672	🇳🇫	NF",
  "+673	🇧🇳	BN",
  "+674	🇳🇷	NR",
  "+675	🇵🇬	PG",
  "+676	🇹🇴	TO",
  "+677	🇸🇧	SB",
  "+678	🇻🇺	VU",
  "+679	🇫🇯	FJ",
  "+680	🇵🇼	PW",
  "+681	🇼🇫	WF",
  "+682	🇨🇰	CK",
  "+683	🇳🇺	NU",
  "+685	🇼🇸	WS",
  "+686	🇰🇮	KI",
  "+687	🇳🇨	NC",
  "+688	🇹🇻	TV",
  "+689	🇵🇫	PF",
  "+690	🇹🇰	TK",
  "+691	🇫🇲	FM",
  "+692	🇲🇭	MH",
  "+7	🇰🇿	KZ",
  "+7	🇷🇺	RU",
  "+81	🇯🇵	JP",
  "+82	🇰🇷	KR",
  "+84	🇻🇳	VN",
  "+850	🇰🇵	KP",
  "+852	🇭🇰	HK",
  "+853	🇲🇴	MO",
  "+855	🇰🇭	KH",
  "+856	🇱🇦	LA",
  "+86	🇨🇳	CN",
  "+880	🇧🇩	BD",
  "+886	🇹🇼	TW",
  "+90	🇹🇷	TR",
  "+91	🇮🇳	IN",
  "+92	🇵🇰	PK",
  "+93	🇦🇫	AF",
  "+94	🇱🇰	LK",
  "+95	🇲🇲	MM",
  "+960	🇲🇻	MV",
  "+961	🇱🇧	LB",
  "+962	🇯🇴	JO",
  "+963	🇸🇾	SY",
  "+964	🇮🇶	IQ",
  "+965	🇰🇼	KW",
  "+966	🇸🇦	SA",
  "+967	🇾🇪	YE",
  "+968	🇴🇲	OM",
  "+970	🇵🇸	PS",
  "+971	🇦🇪	AE",
  "+972	🇮🇱	IL",
  "+973	🇧🇭	BH",
  "+974	🇶🇦	QA",
  "+975	🇧🇹	BT",
  "+976	🇲🇳	MN",
  "+977	🇳🇵	NP",
  "+98	🇮🇷	IR",
  "+992	🇹🇯	TJ",
  "+993	🇹🇲	TM",
  "+994	🇦🇿	AZ",
  "+995	🇬🇪	GE",
  "+996	🇰🇬	KG",
  "+ 998	🇺🇿	UZ",
];
