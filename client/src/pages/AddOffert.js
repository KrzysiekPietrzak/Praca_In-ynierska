import { useState } from 'react';
import moment from 'moment';
import Header from '../component/Header.js'


function App() {

  

  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  const [city, setCity]=useState('');
  const [type, setType]=useState('');
  const [person]=useState((localStorage.getItem("_id")))
const [date]=useState(new Date())
  moment().format();


  async function newOffer(event){
    event.preventDefault()
    const response = await fetch('http://localhost:3030/api/addoffert',{
      method: 'POST', 
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        title,
        body,
        city,
        type,
        person,
        date,
      })
    })
    setTitle('');
    setBody('');
    setCity('');
    setType('');
  }
  return (
    <div className="App">
    <Header />
     <h1>Add Book</h1>
     <form onSubmit={newOffer}>
      <label> Tytuł</label>
      <input 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      type="text"
      placeholder='tytuł'
      />
      <br></br>
      
      <label>Treść</label>
      <input 
      value={body}
      onChange={(e)=>setBody(e.target.value)}
      type="text"
      placeholder='treść'
      />
<br></br>

<label>Miasto</label>
<input 
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      type="text"
      placeholder='miasto'
      />
      <br />

<label>Dziedzina</label>
      <input 
      value={type}
      onChange={(e)=>setType(e.target.value)}
      type="text"
      placeholder='dziedzina'
      />  
      <br />
      
<input type ="submit" value="Dodaj ofertę"/>
     </form>
    </div>
  );
}

export default App;
