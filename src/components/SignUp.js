import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/login.scss';

// const FormInput = props => (
//   <div className="row">
//     <label>{props.description}</label>
//     <input type={props.type} placeholder={props.placeholder}/>
//   </div>  
// );
const SignUp = ({ handle_signup }) =>{

  let navigate=useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');

	const handleEmailChange = (event) => {
			setemail(event.target.value);
	};

    const handleNameChange = (event) => {
        setname(event.target.value);
};

    const handlePwdChange = (event) => {
			setpassword(event.target.value);
	};
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
	const handlesignupbtn =async () => {
    if(name==="" || email==="" || password===""){
      alert("Please fill all the fields!");
    }else if(password.length<8){
      alert("Password must be atleast 8 characters long!");
    }else if(password.includes('password')){
      alert("Password cannot contain 'password'!");
    }else if(!validateEmail(email)){
      alert("Please enter a valid email!");
    }else{
      try{
        await handle_signup(name,email,password);
        navigate('/home');
      }catch(err){
        console.log(err);
        console.log(err.code);
        
      } 
    }
    //navigate('/home');
	};

  return(
    <div className="login">
    <div className="form-wrapper">
  <div id="before">
      <h1>Enter Your Credentials</h1>
      {/* <FormInput description="Username" placeholder="Enter your username" type="text" />
      <FormInput description="Password" placeholder="Enter your password" type="password"/> */}
      <div className="row">
        <label>Username</label>
        <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange}/>
      </div> 
      <div className="row">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange}/>
      </div> 
      <div className="row">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={handlePwdChange}/>
        <label></label>
        <label>Password cannot have 'password'</label>
        <label>Password must be atleast 8 characters long!</label>
      </div> 
      <div className="button-panel">
      {/* <a className="LoginBtn" href="/home"> */}
      <button className="button" onClick={handlesignupbtn}>
          Sign Up
      </button>
      {/* </a> */}
      </div>
 
      <div className="form-footer">
        <p><a  href="/">Log In!</a></p>
      </div>
    
    </div>
    </div>
    </div>
  )
}

export default SignUp;