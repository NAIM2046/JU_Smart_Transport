const express = require('express') 
const app = express() ; 
const cors = require('cors') ;
const jwt = require('jsonwebtoken') ; 
require('dotenv').config() ;
const port = process.env.PORT || 5001; 
app.use(cors()) ; 
app.use(express.json()) ;
app.get('/', (req, res) => {
    res.send('Hello World!!!!')
  })

  
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jusmarttransport00:UCF1xQ23UOMOBlrD@cluster0.9st7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const userCollection =  client.db("JuSmart").collection("users") ;
     
    //user api 
    app.post("/users" , async(req , res) =>{
      const user = req.body ; 
      //console.log(user) ;
      const query = {email: user.email} ;
      const existingUser =  await  userCollection.findOne(query) ;
      if(existingUser){
        return res.send({message : "User already exists"  }) ; 
      }
      const result =  await userCollection.insertOne(user) ;
      res.send(result) ;
    })

    app.get("/user/:email" , async(req , res)=>{
      const email = req.params.email ;
      console.log(req.params) ;
      const query = {email: email} ; 
      const user =  await userCollection.findOne( query) ;
      console.log(user) ;
      if(user){
        res.send(user) ;
      }
      else{
        res.send({message : "user is not found"})
      }

    })





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`)
})