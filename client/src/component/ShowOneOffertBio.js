import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function OffertBio(props){

    const [liked,setLiked]=useState([])
    const params = useParams()


  {/*}  async function upvote(){

        if(liked.includes(localStorage.getItem("_id")))
        await fetch(("http://localhost:3030/api/offertlikedown/"+params.id)+"/"+localStorage.getItem("_id"))  
    else await fetch(("http://localhost:3030/api/offertlikeup/"+params.id)+"/"+localStorage.getItem("_id") )
    } 
    
*/}
    const fetchData = async () => {
        const response = await fetch("http://localhost:3030/api/offert/"+params.id)
        const dataBook = await response.json()
        setLiked(dataBook.liked)
            }
    
      useEffect(() => {
      fetchData()
    },[])
    



    return(
            <div style={{border:"1px solid black", padding:"-30px 10px", width:"60%", margin:"auto"}}>
                <h1 style={{padding:"30px 10px" ,color:"grey"}} >Tytuł:{props.title}</h1>
                <h6 style={{border:"2px solid red"}}> LP:{props.number ? props.number:'1'}</h6>
                <h1 style={{padding:"30px 10px"}}>Treść:{props.body}</h1>
                <br />

                <button /*onClick={upvote}*/ >{'Polub'} </button>
                <label>{liked.length}</label>

            </div>
        )
        
}
export default OffertBio