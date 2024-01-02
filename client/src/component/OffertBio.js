function OffertBio(props){

    return(
            <div style={{border:"1px solid black", padding:"-30px 10px", width:"60%", margin:"auto"}}>
                <a href={/*'http://localhost:3000/offert/'*/"https://serv5.onrender.com/api/offert/"+props.id}>
                <h1 style={{padding:"30px 10px" ,color:"grey"}} >Tytuł:{props.title}</h1>
                <h6 style={{border:"2px solid red"}}> LP:{props.number ? props.number:'1'}</h6>
                <h1 style={{padding:"30px 10px"}}>Treść:{props.body}</h1>
                <br />
                </a>
            </div>
        )
        
}
export default OffertBio