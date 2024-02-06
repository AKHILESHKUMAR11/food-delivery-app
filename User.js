import { useState } from "react";
const User = ({ name }) => {
  const [count] = useState(0);
  const [count2] = useState(1);

  return (
    <div classname="User-card">
      <h1> count = {count} </h1>
      <h1> count2 = {count2} </h1>
      <h2> Name: {name}</h2>
      <h3> Location: Bangalore</h3>
      <h4> Contact: 7061221177</h4>
    </div>
  );
};
export default User;
