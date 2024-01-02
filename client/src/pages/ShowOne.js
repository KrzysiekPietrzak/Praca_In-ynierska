import {useParams} from 'react-router-dom'
import React, { useEffect, useState } from "react"
import ShowOneOffertBio from '../component/ShowOneOffertBio'
import Header from '../component/Header'


function App(){
      const params = useParams()
      
  const [data, setData] = useState([])


        const fetchData = async () => {
    const response = await fetch(/*"http://localhost:3030/api/offert/"*/"http://serv5.onrender.com/api/offert"+params.id)
    const dataBook = await response.json()
        setData(dataBook)


        }

  useEffect(() => {
  fetchData()
}, [])



    return(
<div>
  <Header />
    <ShowOneOffertBio body={data.body} title={data.title} />
</div>
)}
export default App