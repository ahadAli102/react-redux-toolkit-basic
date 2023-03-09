const axios = require("axios");
const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsycnThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const fetchUsers = createAsycnThunk("users/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data.map((user) => user.id));
});

const userSlice = createSlice({
  name: "users",
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
  },
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
