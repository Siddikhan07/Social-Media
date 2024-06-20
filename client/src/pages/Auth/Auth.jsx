import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from "../../actions/AuthAction.js";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading =useSelector((state)=>state.authReducer.loading);
  console.log(loading);

  const [data, setData] = useState({
    firstname:"",
    lastname:"",
    username:"",
    password:"",
    coinfirmpass:""
  });
  const handleChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }
  const [coinfirmPass, setCoinfirmPass] = useState(true);

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (isSignUp) {
      data.password===data.coinfirmpass ? dispatch(signUp(data)) : setCoinfirmPass(false);
    }else{
      dispatch(logIn(data));
    }
  }

  const resetForm = ()=>{
    setCoinfirmPass(true);
    setData({
      firstname:"",
    lastname:"",
    username:"",
    password:"",
    coinfirmpass:""
    })
  }

  return (
    <div className="Auth">
      {/* leftside */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webName">
          <h1>Zeenat Media</h1>
          <h6>Explore the world with Zeenat</h6>
        </div>
      </div>

      {/* rightside */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="coinfirmpass"
                onChange={handleChange}
                value={data.coinfirmpass}
              />
            )}
          </div>

            <span style={{display: coinfirmPass?"none":"block", color:'red', fontSize:'12px', alignSelf:'flex-end', marginRight:'5px'}}>
              * Confirm password is not same
            </span>

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {setIsSignUp((prev) => !prev); resetForm()}}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Dont have an account. Signup!"}
            </span>
          </div>

          <button className="button infoButton" type="submit" disabled={loading}>
            {loading? "loading..." : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
