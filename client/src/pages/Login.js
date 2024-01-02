import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Info from "../component/Info.js";

const Login =()=> {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const navigate = useNavigate();
  const [statusInfo, setStatusInfo]=useState('');


  function wrong (){
    if (statusInfo==="error"){
     return <Info text="Niepoprawne hasło lub login. Wpisz ponownie"></Info>
    }
  }
  

  async function loginUser(event){
    event.preventDefault()

    const response = await fetch(/*'http://localhost:3030/api/login'*/"http://serv5.onrender.com/api/login",{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password,
      })
    })
    const data = await response.json()
  console.log(data.status)

  if (data.status==="ok") {
  setauthenticated(true)
  localStorage.setItem("authenticated", true);
  localStorage.setItem("_id", data.user);

}if (!authenticated) {
 return  navigate("/dashboard");
}
  
  if (data.status==="error"){
    setStatusInfo("error")
  }

  }


 
  return (
    <div className="App">
     <h1>Login</h1>
     <form onSubmit={loginUser}>
      <input 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      type="email"
      placeholder='Name'
      />
      <input 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password"
      placeholder='Password'
      />
      <br />
<input type ="submit" value="Register"/>
     </form>
      {wrong()}

    </div>
  );
}

export default Login;
