import { environment } from "../../environment";

const BACK_URL = environment.BACK_URL
const BACK_URL_NO_NGINX = environment.BACK_URL_NO_NGINX

export const CONSTANTS = {
    login: `${BACK_URL}auth/login`,
    loginWithGoogle: `${BACK_URL_NO_NGINX}auth/google/login`,
    me: `${BACK_URL}auth/me`,
    logout: `${BACK_URL}auth/logout`,
    register: `${BACK_URL}auth/signup`,
    pet: `${BACK_URL}pets/me`,
    date: `${BACK_URL}date`,
    listPet: `${BACK_URL}pets`,
    createPet: `${BACK_URL}pets`,
    deletePet: `${BACK_URL}pets`
}