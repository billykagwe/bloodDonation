/** @format */

import { useMachine } from "@xstate/react";
import { useState } from "react";
import { Task } from "../utils/types";
import { PromiseMachine } from "../machine/Promise.Machine";

export default function Register() {
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
    <div className='container-wrapper register mx-auto max-w-4xl'>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <h2 style={{ marginTop: "10px" }}>Blood Donors Data Collection Form</h2>
      </div>

      {state.matches("loading") && <p style={{ color: "blue" }}>loading....</p>}
      {state.matches("error") && <p style={{ color: "blue" }}>Error</p>}
      {state.matches("success") && <p style={{ color: "blue" }}>Success </p>}
      {state.matches("idle") && (
        <div className='max-w-4xl w-full mx-auto '>
          <div className='section'>
            <div className='section-label'>
              <p>
                Dear Well wisher,
                <p>
                  Please fill the following form that asks for your personal and
                  health related information. Please note this data will only be
                  used creating a database for blood donors in our community.
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
              Will you volunteer for blood donation when there is a requirement
              for your blood group. A Team Oshwal Care Member will call/message
              you and check your availablity.
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
            <div className='contact border-b '>
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
            I hereby declare the information provided by me is correct and best
            of my knowledge
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
