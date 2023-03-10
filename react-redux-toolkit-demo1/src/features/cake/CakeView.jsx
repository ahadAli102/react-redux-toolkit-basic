import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

export const CakeView = () => {
  const numOfCake = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of cakes -{numOfCake}</h2>
      <button
        onClick={() => {
          dispatch(ordered());
        }}
      >
        Order cake
      </button>
      <button onClick={() => dispatch(restocked(10))}>Restoke cakes</button>
    </div>
  );
};
