import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    globalUserFullname: "",
    globalUsername: "",
    globalUserPhoto: ""
}

export const UserSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },

        logout: (state) => {
            state.value = initialStateValue;
        }
    }
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;