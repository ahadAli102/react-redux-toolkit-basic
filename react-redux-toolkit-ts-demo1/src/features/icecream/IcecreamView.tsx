import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ordered, restocked } from "./icecreamSlice";

export const IcecreamView = () => {
  const numOfIcecream = useAppSelector((state) => state.icecream.numOfIcecream);
  const dispatch = useAppDispatch();
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
