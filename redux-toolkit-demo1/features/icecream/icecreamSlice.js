const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfIcecream: 10,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState: initialState,
  reducers: {
    ordered: (state, action) => {
      action.payload === undefined
        ? state.numOfIcecream--
        : (state.numOfIcecream -= action.payload);
    },

    restocked: (state, action) => {
      action.payload === undefined
        ? (state.numOfIcecream += 3)
        : (state.numOfIcecream += action.payload);
    },
  },
  extraReducers: {
    ["cake/ordered"]: (state) => {
      state.numOfIcecream--;
    },
    ["cake/restocked"]: (state, action) => {
      state.numOfIcecream += action.payload;
    },
  },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
