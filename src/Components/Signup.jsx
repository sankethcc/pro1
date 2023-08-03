import React, { useState } from "react";

const Signup = () => {
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
    console.log(value)

    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };

    setRecords([...records, newRecord]);
    console.log(records);

    setUserRegistration({
      firstname: "",
      lastname: "",
      userid: "",
      email: "",
      number:"",
      password: "",
      gender: ""
    });
  };
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="signup-data name">
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              autoComplete="off"
              value={userRegistration.firstname}
              onChange={handleInput}
            ></input>
            <input
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
