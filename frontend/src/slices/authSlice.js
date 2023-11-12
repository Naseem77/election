import { createSlice } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js';
const SECRET_KEY = 'mysecretkey';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('userInfo'), SECRET_KEY).toString(CryptoJS.enc.Utf8)) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(action.payload), SECRET_KEY).toString(); 
            localStorage.setItem('userInfo', encrypted)
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        decryptData: () => {
            const encrypted = localStorage.getItem('userInfo');
            const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        }
    }
})

export const { setCredentials, logout, decryptData} = authSlice.actions;

export default authSlice.reducer