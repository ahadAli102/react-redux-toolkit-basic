import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from "../cake/cakeSlice";
import { restocked as cakeRestocked } from "../cake/cakeSlice";

type InitialState = {
  numOfIcecream: number
}
const initialState = {
  numOfIcecream: 10,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState: initialState,
  reducers: {
    ordered: (state, action : PayloadAction<number | undefined>) => {
      action.payload === undefined
        ? state.numOfIcecream--
        : (state.numOfIcecream -= action.payload);
    },

    restocked: (state, action : PayloadAction<number | undefined>) => {
      action.payload === undefined
        ? (state.numOfIcecream += 3)
        : (state.numOfIcecream += action.payload);
    },
  },
  // extraReducers: {
  //   ["cake/ordered"]: (state) => {
  //     state.numOfIcecream--;
  //   },
  //   ["cake/restocked"]: (state, action) => {
  //     state.numOfIcecream += action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.numOfIcecream--;
    });
    // builder.addCase(cakeRestocked, (state, action) => {
    //   state.numOfIcecream += action.payload;
    // });
  },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
