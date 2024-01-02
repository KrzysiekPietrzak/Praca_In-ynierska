import React, { useEffect, useState } from "react"
import OffertBio from "../component/OffertBio.js"
import Header from "../component/Header.js"
import {useParams} from 'react-router-dom'


function App(){
  const params = useParams()
  const id=params.id;

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetchData()
  }, [])

        const fetchData = async () => {
    const response = await fetch(/*"http://localhost:3030/api/offerts/"*/"http://serv5.onrender.com/api/offerts"+params.id)
    const dataBook = await response.json()
        setData(dataBook)

  }


function display(j){
  let a=([]);
  for( j=0;j<data.length;j++){
    console.log(j);
    console.log(data[j])
    a[j]=<OffertBio number={(id*3)-2+j} id={data[j]._id} body={data[j].body} title={data[j].title}/>

}return a}



return(
<div >

<Header />
  <h1>show offers</h1>
{display(data.length)}

<div style={{width:"15vw", margin:"auto", paddingBottom:"20px"}}>
{id>2 ?  <a href={'http://localhost:3000/offerts/page/'+(id-2)}>{id-2}</a>: <a> {''}</a>}

{id>1 ?  <a href={'http://localhost:3000/offerts/page/'+(id-1)}>{' '+ (id-1)+' '}</a>: <a>1</a>}
{id>=4 ? <label>{'•••'}</label>:''}
<a href={'http://localhost:3000/offerts/page/'+(parseInt(id) +1)}>{(' '+ (parseInt(id)+1)+' ')}</a>
<a href={'http://localhost:3000/offerts/page/'+(parseInt(id)+2)}>{( parseInt(id)+2+' ')}</a>
</div>

</div>
)}
export default App