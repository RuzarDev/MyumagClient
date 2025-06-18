import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: ''
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    WriteToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});

export const { WriteToken } = AuthSlice.actions;
export default AuthSlice.reducer;
