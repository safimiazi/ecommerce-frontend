import { createSlice } from "@reduxjs/toolkit";


type TLoginRegistrationState = {
    status: "login" | "registration";
    isModalOpen: boolean;
};

const initialState: TLoginRegistrationState  = {
    status: "login",
    isModalOpen: false
}

const loginRegisrationSlice = createSlice({
    name: "loginRegistration",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.status = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
       
    },
})

export const { openModal, closeModal } = loginRegisrationSlice.actions;

export default loginRegisrationSlice.reducer;