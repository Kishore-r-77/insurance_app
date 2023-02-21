import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  loading: false,
  isLogged: false,
  phone: "",
  password: "",
  user: {},
  error: "",
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { getState }) => {
    const state: any = getState();

    const resp = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      {
        phone: state.users.phone,
        password: state.users.password,
      },
      { withCredentials: true }
    );

    return resp.data;
  }
);

const signinSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onChangePhone: (state, action) => {
      state.phone = action.payload;
    },
    onChangePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserDetails.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isLogged = true;
        state.phone = state.phone;
        state.password = state.password;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.user = {};
      state.error = action.error.message || "Something Went Wrong";
    });
  },
});

export default signinSlice.reducer;
export const { onChangePhone, onChangePassword } = signinSlice.actions;
