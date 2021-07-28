/** @format */

import { useMachine } from "@xstate/react";
import { useState } from "react";
import { Task } from "../utils/types";
import { PromiseMachine } from "../machine/Promise.Machine";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({});
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
    <div className='container-wrapper'>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Image width={150} height={150} alt='logo' src='/logo.png' />

        <h2 style={{ marginTop: "10px" }}>Blood Donation Form</h2>
      </div>

      {state.matches("loading") && <p>loading....</p>}
      {state.matches("error") && <p>Error</p>}
      {state.matches("success") && <p>Success </p>}
      {state.matches("idle") && (
        <>
          <div className='section'>
            <div className='section-label'>
              <p>
                Dear Oshwals, please fill the following form that ask for your
                personal and health related information. Please note this data
                will only be used creating a database for blood donors in our
                community
              </p>
            </div>
            <div className='names border-b'>
              <input
                onChange={formDataChange}
                name='firstName'
                type='text'
                placeholder='First Name'
              />
              <input
                onChange={formDataChange}
                name='middleName'
                type='text'
                placeholder='Middle Name'
              />
              <input
                onChange={formDataChange}
                name='lastName'
                type='text'
                placeholder='Last Name'
              />
              <input
                onChange={formDataChange}
                name='occupation'
                type='text'
                placeholder='Occupation'
              />
            </div>
          </div>

          <div className='border-b section'>
            <p>
              If you are a doctor or other related proffesion would you like to
              volunteer for your services to the community when needed
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
            <p>Please Fill Date of Birth</p>
            <div className='birthdate-input'>
              <input
                name='day'
                className='numberInput'
                type='number'
                placeholder='Day'
              />
              <select name='month' onChange={formDataChange}>
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
              placeholder='+254 Mobile number'
            />
            <input
              onChange={formDataChange}
              name='bloodGroup'
              type='text'
              placeholder='Blood Group'
            />
          </div>
          <div className='section'>
            <p>
              Are you willing to volunteer for blood donation when Team Oshwai
              Care members will call or message for the requirement and also to
              check for your availability
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
              Do you hav of the following health equipments which can be lent to
              Oshwals when they are in need?{" "}
            </p>
            <div className='contact border-b '>
              <div className='equipments'>
                <span>Stretcher</span>
                <input onChange={imageInput} name='stretcher' type='file' />
              </div>
              <div className='equipments'>
                <span>A Medical Bed</span>
                <input onChange={imageInput} name='medicalBed' type='file' />
              </div>
              <div className='equipments'>
                <span>Adult Walker</span>
                <input onChange={imageInput} name='adultWalker' type='file' />
              </div>
              <div className='equipments'>
                <span>Oxygen Concentrator</span>
                <input
                  onChange={imageInput}
                  name='oxygenContentrator'
                  type='file'
                />
              </div>
              <div className='equipments'>
                <span>Nebulizer</span>
                <input onChange={imageInput} name='nebulizer' type='file' />
              </div>
              <div className='equipments'>
                <span>A Baby Crib</span>
                <input onChange={imageInput} name='babyCrib' type='file' />
              </div>
            </div>
          </div>
          <p>
            I hereby declare the information provided by me is correct and best
            of my knowledge
          </p>
          <button
            onClick={() =>
              send({ type: "SUBMIT", data: { formData, equipmentImages } })
            }
            className='submit'>
            Submit
          </button>
        </>
      )}
    </div>
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
