/** @format */

import { createMachine } from "xstate";
import { assign } from "xstate/lib/actionTypes";

interface IMachineContext {
  firstName: string;
  lastName: string;
  middleName: string;
  occupation: string;
  doctor: boolean;
  birthDate: string;
  email: string;
  bloodGroup: string;
  city: string;
  county: string;
  nativePlace: string;
  donationEquipments: [];
}

export const BloodDonationMachine = createMachine({
  id: "BloodDonationMachine",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        EDIT: {},
      },
    },
  },
});
