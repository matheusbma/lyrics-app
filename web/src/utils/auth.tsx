import { getItemStorage, removeItemStorage, setItemStorage } from "./storageProxy";

export const AUTHORIZATION_KEY = 'AUTHORIZATION_KEY';

export const setAuthUser = (user: object) => setItemStorage(AUTHORIZATION_KEY, user);

export const getAuthUser = () => getItemStorage(AUTHORIZATION_KEY);

export const unsetAuthUser = () => removeItemStorage(AUTHORIZATION_KEY);
