import React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
//import AddNew from './AddNew';
var axios = require('axios');

//var authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkzNmFmNzY0OWExNjM2ODc4OWU0OGUiLCJpYXQiOjE2NTM4MjgzNDN9.IWFqZmn797jRgRQmlgi28QtVBlI4PQ_BcRCK1VJiisY';
var auth='hemlo';
function App() {
  //let navigate=useNavigate();
  const [authToken, setAuth] = useState(auth);
  localStorage.setItem('authToken',authToken);
  //console.log(authToken);
  useEffect(() => {
  }, [authToken]);

  const login=async (user,pwd)=>{
        
    var data = JSON.stringify({
      "email": user,
      "password": pwd
    });

    var config = {
      method: 'post',
      url: 'https://labeeb-notes-app.herokuapp.com/users/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try{
      const response=await axios(config);
      setAuth(response.data.token);
      auth=response.data.token;
      localStorage.setItem('authToken',response.data.token);
    }catch(e){
      throw new Error(e);
    }

  }

  const signup=async (name,email,pwd)=>{
        
    var data = JSON.stringify({
      "name": name,
      "email": email,
      "password": pwd
    });
    
    var config = {
      method: 'post',
      url: 'https://labeeb-notes-app.herokuapp.com/users',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try{
      const response=await axios(config);
      setAuth(response.data.token);
      localStorage.setItem('authToken',response.data.token);
    }catch(e){
      throw e;
    }

  }
  const logout=async ()=>{
      var config = {
        method: 'post',
        url: 'https://labeeb-notes-app.herokuapp.com/users/logout',
        headers: { 
          'Authorization': 'Bearer '+localStorage.getItem('authToken'),
        }
      };
      
      axios(config)
      .then(function (response) {
        setAuth('');
        localStorage.setItem('authToken','');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  return (
    <Router>
			<Routes>
				<Route path='/' element={<Login handle_login={login}/>} />
				<Route path='/home' element={<Home authToken={authToken} logout={logout}/>} />
        <Route path='/signup' element={<SignUp handle_signup={signup}/>} />
        {/* <Route path={`home/help`} element={<div>HELP</div>} /> */}
        {/* <Route path='/addnew' element={<AddNew handleAddNote={addNote}/>} /> */}
			</Routes> 
		</Router>
  );
}

export default App;