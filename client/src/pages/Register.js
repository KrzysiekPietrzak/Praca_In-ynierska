import { Component, useState } from 'react';
import Info from "../component/Info";
import {useNavigate} from 'react-router-dom'


function App() {

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [password2,setPassword2]=useState('');

  const navigate = useNavigate();

  async function registerUser(event){
    event.preventDefault()

    const response = await fetch(/*'http://localhost:3030/api/register'*/"http://serv5.onrender.com/api/",{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        email,
        password,
      })
    })
    const data = await response.json()
    console.log(data.status)
console.log(data.status==="ok")
    if (data.status==="ok"){
    return  navigate("/dashboard");
    }

      }

  

  return (
    <div className="App">
     <h1>Register</h1>
     <form onSubmit={registerUser}>

    <label>Imię </label>    
     <input 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      type="text"
      placeholder='Name'
      />
      <br />

      <label>Email </label>    
      <input 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      type="email"
      placeholder='Email'
      />
      <br />

      <label>Hasło </label>    
      <input 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password"
      placeholder='Password'
      />
<br></br>
    
<label>Powtórz hasło </label>    
   <input 
      value={password2}
      onChange={(e)=>setPassword2(e.target.value)}
      type="password"
      placeholder='Password2'
      />

      <br />
<input type ="submit" value="Register"/>
     </form>
    </div>
  );
}

export default App;
