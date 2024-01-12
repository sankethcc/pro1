import React, { useState } from "react";

import userlogo from "../../assets/userlogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { State } from "../Context/Provider";
const Login = () => {
  const {isLoggedIn, setIsLoggedIn} = State()
  const navigate = useNavigate()
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
  const login = (e)=>{
    e.preventDefault()
      axios.post("http://localhost:5000/login",{
        user_id:user,
        password:password
      }).then((response)=>{
        if(response.status===200){
          console.log(response.data.message)
          localStorage.setItem("user", JSON.stringify(response.data.data))
          setIsLoggedIn(true)
          if(response.data.data.admin){
            navigate('/admin')
          }else{
            navigate('/')

          }
          
          
        }else{
          alert(response.data.message)
        }
      }).catch((error)=>{
        alert(error.response.data)
      })
  }
  return (
    <>
      <div className="login-page">
        <form id="login-form" onSubmit={login}>
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
