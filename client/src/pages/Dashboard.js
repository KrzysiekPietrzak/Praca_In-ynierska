import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const [authenticated] = useState(localStorage.getItem("authenticated")||false);
    const navigate = useNavigate();

  useEffect(()=>{
    if (authenticated==="false" || authenticated===false){
  return navigate("/login");
    }

  },[authenticated, navigate])

  function dea(){
    localStorage.setItem("authenticated",false);
    localStorage.removeItem("_id");
    window.location.reload(false);
  }


  return (
  <div>
  <p>Welcome to your Dashboard</p>
  <button onClick={dea}/>
  </div>
  );
};

export default Dashboard;