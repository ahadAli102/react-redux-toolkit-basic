import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

export const IcecreamView = () => {
  const numOfIcecream = useSelector((state) => state.icecream.numOfIcecream);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of ice cream - {numOfIcecream}</h2>
      <button onClick={() => dispatch(ordered())}>Order ice cream</button>
      <button onClick={() => dispatch(restocked())}>Restoke ice cream</button>
      <button onClick={() => dispatch(ordered(2))}>Order 2 ice cream</button>
      <button onClick={() => dispatch(restocked(5))}>
        Restoke 5 ice cream
      </button>
    </div>
  );
};
