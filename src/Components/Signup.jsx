import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [userRegistration, setUserRegistration] = useState({
    firstname: "",
    lastname: "",
    userid: "",
    email: "",
    number: "",
    password: "",
    gender: "",
  });

  const [records, setRecords] = useState([]);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // const newRecord = {
    //   ...userRegistration,
    //   id: new Date().getTime().toString(),
    // };

    // setRecords([...records, newRecord]);
    // console.log(records);
    axios
      .post('http://localhost:5000/sign_up', {
        first_name:userRegistration.firstname,
        last_name:userRegistration.lastname,
        email:userRegistration.email,
        contact:userRegistration.number,
        password:userRegistration.password,
        gender:userRegistration.gender,
        user_id:userRegistration.userid
      })
      .then((response)=>{
        if(response.status==200){
          console.log(response.data)
          setUserRegistration({
            firstname: "",
            lastname: "",
            userid: "",
            email: "",
            number:"",
            password: "",
            gender: ""
          });
          navigate('/login')

        }else{
          console.log(response)
        }
      }).catch((e)=>{
        console.log(e)
      })
    
  };
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="signup-data name">
            <input
              required
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              autoComplete="off"
              value={userRegistration.firstname}
              onChange={handleInput}
            ></input>
            <input
              required
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              autoComplete="off"
              value={userRegistration.lastname}
              onChange={handleInput}
            ></input>
          </div>
          <div className="signup-data userdata">
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              autoComplete="off"
              value={userRegistration.email}
              onChange={handleInput}
            ></input>
          </div>
          <div className="signup-data userdata">
            <input
              required
              type="number"
              name="number"
              id="number"
              placeholder="contact"
              autoComplete="off"
              value={userRegistration.number}
              onChange={handleInput}
            ></input>
          </div>
          <div className="signup-data userdata">
            <input
              required
              type="text"
              name="userid"
              id="userid"
              placeholder="User ID"
              autoComplete="off"
              value={userRegistration.userid}
              onChange={handleInput}
            ></input>
          </div>
          <div className="signup-data userdata">
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              value={userRegistration.password}
              onChange={handleInput}
            ></input>
          </div>
          <div className="signup-data userdata ">
            <div
              className="gender"
              value={userRegistration.gender}
              onChange={handleInput}
            >
              <span className="gender-span">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  id="male"
                ></input>
              </span>
              <span className="gender-span">
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  id="female"
                ></input>
              </span>
              <span className="gender-span">
                <label htmlFor="trans">Trans</label>
                <input
                  type="radio"
                  value="trans"
                  name="gender"
                  id="trans"
                ></input>
              </span>
            </div>
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        {
          records.map((curElem)=>{
            return(
              <div className="showDataStyle" key={curElem.id}>
                <p>{curElem.firstname}</p>
                <p>{curElem.lastname}</p>
                <p>{curElem.number}</p>
                <p>{curElem.email}</p>
                <p>{curElem.password}</p>
                <p>{curElem.username}</p>
                <p>{curElem.gender}</p>

              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Signup;
