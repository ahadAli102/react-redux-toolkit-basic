import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk as createAsycnThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    address:  Address;
    phone:    string;
    website:  string;
    company:  Company;
}

export interface Address {
    street:  string;
    suite:   string;
    city:    string;
    zipcode: string;
    geo:     Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name:        string;
    catchPhrase: string;
    bs:          string;
}

type InitialState = {
  loading: boolean,
  users: User[]
  error: string
}

const initialState: InitialState = {
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

export const deleteUser = createAsycnThunk("users/deleteUser", (id:number) => {
  deleteId = id;
  return axios
    .delete("https://jsonplaceholder.typicode.com/users/" + id)
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers :{},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action:PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message || 'Some thing went wrong';
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
      state.error = action.error.message || 'Delete failed';
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
