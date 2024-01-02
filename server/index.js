const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
const Offert = require('./models/offert.model.js')
const Scores = require('./models/scores.model.js')
const jwt = require('jsonwebtoken')

const PORT = 3030 || process.env.PORT;

app.use(cors())
app.use(express.json())

mongoose.connect(
  `mongodb+srv://a:a@c0.jclsh5d.mongodb.net/auth?retryWrites=true&w=majority`, 
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get('/hello', (req, res)=>{
    console.log("Hello world indeed");
    res.send('hello world')
})


app.get('/api/offertlike/:offert',async(req,res)=>{
    let rpo=req.params.offert
    let rest=[];
    let collection =  db.collection("offert");
 
     await Offert.findOne({_id: rpo})
  .then((docs)=>{
 
     rest= docs;
 
  })
  .catch((err)=>{
     console.log('bad');
 
      console.log(err);
  });
 
 
} )

app.get('/api/offert/:id', async(req, res)=>{

    let rpi= req.params.id
    console.log('api/offert/id');

    let rest=[];
   let collection =  db.collection("offert");

    await Offert.findOne({_id: rpi})
 .then((docs)=>{
    console.log('good');

    rest= docs;

 })
 .catch((err)=>{
    console.log('bad');

     console.log(err);
 });


  if (!rest) res.send("Not found").status(404);
  else res.json(rest).status(200);
});


app.put('/api/editoffert/:id', async(req, res)=>{

    let rpi= req.params.id
    let rest=[];
   let collection =  db.collection("offert");

   Offert.findByIdAndUpdate(rpi, req.body, { new: true }).then(item => {
    console.log(item);
    res.status(203).json({ message: 'Item Fetched Successfully', data:item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});


app.delete('/api/deleteoffert/:id', (req, res) => {
    let rpi= req.params.id
    Offert.findByIdAndRemove(rpi).then(item => {
      console.log(item);
      res.status(203).json({ message: 'Item Deleted Successfully', data:item });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  });
  

{/*}
app.get('/userinfo/:id', async(req, res)=>{


    let rpi= req.params.id
    let rest;

    await User.findOne({_id: rpi })
 .then((docs)=>{
    rest = docs;
 })
 .catch((err)=>{
     console.log(err);
 });

  if (!rest) {
    res.send("Not found").status(404);
  return}

res.send(rest);
});

*/}

    app.get('/api/offerts/:id', async(req, res)=>{

    let rpi= req.params.id
    let rest;
   let collection = await db.collection("offert");

  let result = await Offert.find({}).limit(3).skip(parseInt((rpi-1)*3))
 .then((docs)=>{
    rest= docs;

 })
 .catch((err)=>{
     console.log(err);
 });

  if (!rest) res.send("Not found").status(404);
  else res.json(rest).status(200);
});

{/*
app.get('/getBooksInfo/:id', async(req, res)=>{

    let rpi= req.params.id
    let rest;
    let rest2;
   let collection = await db.collection("offers");
    
   
   

    let result = await Scores.findOne({_id:rpi})
 .then((docs)=>{
    rest= docs;
    })
 .catch((err)=>{
     console.log(err);
 
 })

  if (!rest) res.send("Not found").status(404); 
  else res.json(rest).status(200);
 });




app.get('/getBooksId/:id', async(req, res)=>{

    let rpi= req.params.id
    let rest;
    let rest2;
   let collection = await db.collection("book");
   let collection2 = await db.collection("scores");

const users = await Scores.aggregate([

       { $match: { user : rpi }},

  {
    $lookup: {
      from: 'book',     //collection name
      localField: 'book',
      foreignField: '_id',
      as: 'devo'        //alias
    },
  },
   {$unwind: '$devo'},



]);
   /*let a = await db.collection("book").find({}).toArray((err, result) => {
    console.log(result);
    });

console.log(a);
  */ /*db.createView( "sales", "book", [
   {
      $lookup:
         {
            from: "scores",
            localField: "book",
            foreignField: "_id",
            as: "inventoryDocs"
         }
   }])
*/
    /*let result = await Scores.find({user:rpi})
 .then((docs)=>{
    rest= docs;
    })
 .catch((err)=>{
     console.log(err);
 
 })


  if (!users) res.send("Not found").status(404); 
  else res.json(users).status(200);
 });


*/}




app.post('/api/addoffert', async (req, res)=>{
    try{
         await Offert.create({
            title:req.body.title,
            body:req.body.body,
            city:req.body.city,
            type:req.body.type,
            person:req.body.person,
            date:req.body.date,
        })
        res.json({status:'ok'})
        console.log("Connected successfully");

    }catch (err){
        console.log(err)
        res.json({status:'error', error:'Error addoffer'})
    }
})


app.get('/api/likebook/:userid/:bookid', async (req, res)=>{
    let ui= req.params.userid;
    let bi= req.params.bookid;

try{
         await Scores.create({
            user: ui,
            book: bi,

        })
        res.json({status:'ok',user:ui,book:bi})
    }catch (err){
        res.json({status:'error', error:'Error likebook'})
    }
   
})



app.post('/api/register', async (req,res) =>{
    try{
         await User.create({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        res.json({status:'ok'})
    }catch (err){
        res.json({status:'error', error:'Duplicate'})
    }
})


app.post('/api/login', async (req,res) =>{
   const user = await User.findOne({
    email:req.body.email,
    password:req.body.password,
   })


   if (user){
    const token = jwt.sign(
        {
        name:user.name,
        email:user.email,
    }, 'secret123')
    

    return res.json({status: 'ok', user:token, user:user._id})
   } else {
    return res.json({status: 'error', user:false })
   }
})

/*
app.post('/api/register',(req,res)=>{
    res.json({status:'ok'})
})
*/
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});