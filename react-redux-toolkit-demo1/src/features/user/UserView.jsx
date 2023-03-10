import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "./userSlice";

export const UserView = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  console.log(user);
  return (
    <div>
      <h2>
        {user.users.map((u) => {
          return (
            <div key={u.id}>
              {`Id: ${u.id}\nName: ${u.name}`}
              <button onClick={() => dispatch(deleteUser(u.id))}>Delete</button>
            </div>
          );
        })}
      </h2>
    </div>
  );
};
