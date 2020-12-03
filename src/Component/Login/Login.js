import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handleSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./LoginManager";

import "./Login.css";
import google from "../../google.png";
import logo from "../../logo2.png"
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));
const Login = () => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };


  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };
  return (
   
      <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                   <div className="col-md-6">
                     <img style={{height:'60px',margin:'1px auto',display:'block'}} src={logo} alt=""/>

           <button className="Google" onClick={googleSignIn}>
              <img style={{height:'50px'}} src={google} alt="" />
                Continue with google 
          </button>
            
          <form id='loginAria' onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            
            {newUser && (
                 <input
                   onBlur={handleBlur}
                   type="text"
                   name="name"
                   placeholder="write your name"
                   id="standard-basic"
                   label="Your name"
                   required
                 />
               )}
            
               <input
                 onBlur={handleBlur}
                 type="text"
                 name="email"
                 placeholder='write you email'
                 id="standard-basic"
                 label="Your email address"
                 required
               />
               <input
                 onBlur={handleBlur}
                 type="password"
                 name="password"
                 placeholder='password'
                 id="standard-basic"
                 label="Enter Your password"
                 required
               />
            
               {newUser && (
                 <input
                   onBlur={handleBlur}
                   type="password"
                   name="confirm"
                   placeholder='conferm password'
                   id="standard-basic"
                   label="Enter Your confirm password"
                   required
                 />
               )}
            
              
            
               <button className="loginBtn" type="submit">
                 {newUser ? "Create an Account" : "Login"}
               </button>
            
             
               <h5
                 style={{ cursor: "pointer" }}
                 onClick={() => setNewUser(!newUser)}
                 className="pb-5 text-center text-danger"
               >
                 {newUser ? "Already have an account" : " Create  an new account"}
               </h5>
            
             </form>
               

             </div>

             <div className="col-md-3"></div>
       
     </div>
     </div>


    
  );
};

export default Login;


