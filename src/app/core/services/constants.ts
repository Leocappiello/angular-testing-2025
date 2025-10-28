import { environment } from "../../environment";

const BACK_URL = environment.BACK_URL
console.log(environment.BACK_URL);
export const CONSTANTS = {
    login: `${BACK_URL}auth/login`,
    me: `${BACK_URL}auth/me`,
    logout: `${BACK_URL}auth/logout`,
    register: `${BACK_URL}auth/signup`,
    pet: `${BACK_URL}pets/me`,
    date: `${BACK_URL}date`,
    listPet: `${BACK_URL}pets`,
    createPet: `${BACK_URL}pets`,
    deletePet: `${BACK_URL}pets`
}