import { useState } from 'react';
import moment from 'moment';
import Header from '../component/Header.js'
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import Info from '../component/Info.js'
import { useNavigate } from "react-router-dom"



function App() {

  const params = useParams()
  const navigate = useNavigate()

  
const [oldOffert,setOldOffert]= useState('');
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  const [city, setCity]=useState('');
  const [type, setType]=useState('');
  const [person]=useState((localStorage.getItem("_id")))
const [date]=useState(new Date())
  moment().format();


  useEffect(() => {
    fetchData()
  }, [])

       const fetchData = async () => {
    const response = await fetch("http://localhost:3030/api/offert/"+params.id)
   // console.log(response.clone.json())
    const dataBook = await response.json()
        setOldOffert(dataBook)

  }


function asecurate(){
    if(person!=oldOffert.person) {
      navigate("/dashboard");
    }
}


  async function newOffer(event){
    event.preventDefault()
    if(person!=oldOffert.person) {
      return <Info text="Niewłaściwy użytkownik. Odmowa zmiany."/>
      ;
    }
    const response = await fetch('http://localhost:3030/api/editoffert/'+params.id,{
      method: 'PUT', 
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        title,
        body,
        city,
        type,
        date,
      })
    })
  }

  async function deleteOffert(event){
    event.preventDefault()
    const response = await fetch('http://localhost:3030/api/deleteoffert/'+params.id,{
      method: 'DELETE', 
      headers:{
        'Content-Type':'application/json'
      },
      
      
    })
  }
  return (
    <div className="App">
      {asecurate()}
    <Header />
     <h1>Add Book</h1>
     <form onSubmit={newOffer}>
      <label> Tytuł</label>
      <input 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      type="text"
      placeholder={oldOffert.title}
      />
      <br></br>
      
      <label>Treść</label>
      <input 
      value={body}
      onChange={(e)=>setBody(e.target.value)}
      type="text"
      placeholder={oldOffert.body}
      />
<br></br>

<label>Miasto</label>
<input 
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      type="text"
      placeholder={oldOffert.city}
      />
      <br />

<label>Dziedzina</label>
      <input 
      value={type}
      onChange={(e)=>setType(e.target.value)}
      type="text"
      placeholder={oldOffert.type}
      />  
      <br />
      
<input type ="submit" value="Zapisz zmienioną ofertę"/>

     </form>

<form onSubmit={deleteOffert}>
<input type ="submit" value="Usuń zmienioną ofertę"/>
</form>

    </div>
  );
}

export default App;
