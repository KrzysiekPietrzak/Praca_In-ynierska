//import {useParams} from 'react-router-dom'
import React, { useEffect, useState } from "react"
import OfferBio from "../component/OffertBio.js"


function App(){
        const [data, setData] = useState([])
        const [data2, setData2] = useState([])


        
        const fetchData = async () => {
        let userId= localStorage.getItem("_id");        
            fetch("localhost:3030/getBooksId/"+userId)
            .then(response => {
            return response.json()
      })
      .then(data => {
        setData(data)
      })


  }
/*
          const fetchData2 = async () => {
        const response = await fetch("http://localhost:1337/book/"+data._id)
        const dataBook2 = await response.json()
        console.log(dataBook2);

        setData2(dataBook2)

  }
*/

  useEffect(() => {
            console.log("11");

    fetchData()
  //  fetchData2()


  }, [])

  

const bookInfo = () =>{
  return (
    data.map((data => <OfferBio/>  ) )
  )
}


return(
<div>
{bookInfo()}
</div>
)}
export default App