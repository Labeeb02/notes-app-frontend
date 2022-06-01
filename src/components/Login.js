import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/login.scss';

const Login = ({ handle_login }) =>{

  let navigate=useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

	const handleEmailChange = (event) => {
			setemail(event.target.value);
	};

  const handlePwdChange = (event) => {
			setpassword(event.target.value);
	};

	const handleloginbtn =async () => {
    if(email==="" || password===""){
      alert("Please fill all the fields!");
    }else{
      try{
        await handle_login(email,password);
        navigate('/home');
      }catch(err){
        alert("Wrong Email Or Password!");
      } 
    }
	};

  return(
    <div className="login">
    <div className="form-wrapper">
  <div id="before">
      <h1>Enter Your Credentials</h1>
      {/* <FormInput description="Username" placeholder="Enter your username" type="text" />
      <FormInput description="Password" placeholder="Enter your password" type="password"/> */}
      <div className="row">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" value={email} onChange={handleEmailChange}/>
      </div> 
      <div className="row">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={handlePwdChange}/>
      </div> 
      <div className="button-panel">
      {/* <a className="LoginBtn" href="/home"> */}
      <button className="button" onClick={handleloginbtn}>
          Sign In 
      </button>
      {/* </a> */}
      </div>
 
      <div className="form-footer">
        <p><a  href="/signup">Sign Up!</a></p>
      </div>
    
    </div>
    </div>
    </div>
  )
}

export default Login;

// class LoginForm extends React.Component{
//   render(){
//     return(
//       <div id="loginform">
//         <FormHeader title="Login" />
//         <Form />
//         {/* <OtherMethods /> */}
//       </div>
//     )
//   }
// }


// class LoginForm extends React.Component{
//   render(){
//     return(
//       <div class="login">
//       <div class="form-wrapper">
//     <div id="before">
//         <h1>You Have Been</h1>
//         {/* <h1>Registered As a Patient</h1>
//         <h1> </h1>
//         <h1> </h1>
//         <h1> </h1>
//         <h1>Please Check You Mail</h1>
//         <h1>For Further Updates</h1> */}
//         <FormInput description="Username" placeholder="Enter your username" type="text" />
//       <FormInput description="Password" placeholder="Enter your password" type="password"/>
//         <div class="button-panel">
//         <a class="LoginBtn" href="/home">
//         <button class="button">
//             Home
//         </button>
//         </a>
//         </div>
   
//         <div class="form-footer">
//           <p><a  href="/">Sign Up!</a></p>
//         </div>
      
//       </div>
//       </div>
//       </div>
//     )
//   }
// }

// const FormHeader = props => (
//     <h2 id="headerTitle">{props.title}</h2>
// );


// const Form = props => (
//    <div>
//      <FormInput description="Username" placeholder="Enter your username" type="text" />
//      <FormInput description="Password" placeholder="Enter your password" type="password"/>
//      <FormButton title="Log in"/>
//    </div>
// );

// const FormButton = props => (
//   <a href='/home' class='LoginBtn'>
//     <div id="button" class="row">
//     <button>{props.title}</button>
//   </div>
//   </a>
// );

// const OtherMethods = props => (
//   <div id="alternativeLogin">
//     <label>Or sign in with:</label>
//     <div id="iconGroup">
//       <Facebook />
//       <Twitter />
//       <Google />
//     </div>
//   </div>
// );

// const Facebook = props => (
//   <a href="#" id="facebookIcon"></a>
// );

// const Twitter = props => (
//   <a href="#" id="twitterIcon"></a>
// );

// const Google = props => (
//   <a href="#" id="googleIcon"></a>
// );
