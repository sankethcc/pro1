import React, { useState } from "react";

import userlogo from "../../assets/userlogo.png";
import { Link } from "react-router-dom";
const Login = () => {
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")

  return (
    <>
      <div className="login-page">
        <form id="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="userImage">
            <img src={userlogo} alt="User" />
          </div>
          <div className="inputs">
            <input type="text" name="email" id="email" placeholder="UserName/email" autoComplete="off"
                value={user} onChange={(e)=>{setUser(e.target.value)}}
            />
          </div>
          <div className="inputs">
            <input type="password" name="password" id="password"  placeholder="Passowrd"
                value={password} onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <button type="submit">Login</button>
          <button><Link to='/signup'>SignUp</Link></button>
        </form>

      </div>
    </>
  );
};

export default Login;
