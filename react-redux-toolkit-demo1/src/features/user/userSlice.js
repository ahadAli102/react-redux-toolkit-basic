import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk as createAsycnThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

let deleteId = -1;

export const fetchUsers = createAsycnThunk("users/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data);
});

export const deleteUser = createAsycnThunk("users/deleteUser", (id) => {
  deleteId = id;
  return axios
    .delete("https://jsonplaceholder.typicode.com/users/" + id)
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.users = [];
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== deleteId);
      state.error = "";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.users = [];
    });
  },
});

export default userSlice.reducer;
