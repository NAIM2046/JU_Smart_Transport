const express = require('express') 
const app = express() ; 
const cors = require('cors') ;
const jwt = require('jsonwebtoken') ;
const http =  require('http') ;
const {Server} = require('socket.io') 
require('dotenv').config() ;
const port = process.env.PORT || 5001; 
app.use(cors()) ; 
app.use(express.json()) ;

const server =  http.createServer(app) ;
const io = new Server(server , {
  cors: {
    origin: "http://localhost:5173", // Allow connections from all origins
    methods: ["GET", "POST"],
  },
}) 
app.get('/', (req, res) => {
    res.send('Hello World!!!!')
  })
  
  io.on("connection" , (socket) =>{
    console.log("A user connected " , socket.id) ;
    socket.on("join-driver-room" , (driverEmail) =>{
      socket.join(driverEmail) ;
      console.log(`User joined room: ${driverEmail}`);
      socket.on("location-update" , (data)=>{
        const { driverEmail, latitude, longitude } = data;
        io.to(driverEmail).emit("location-update" , { latitude, longitude }) ; 
        console.log(`Location update for ${driverEmail}: ${latitude}, ${longitude}`);
      })
    })
  
    socket.on("disconnect" , () =>{
      console.log("User disconnected:", socket.id);
    })
   })
  
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9st7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const Reg_userCollection =  client.db("JuSmart").collection("reg_users") ;
    const DriverCollection =  client.db("JuSmart").collection("reg_drivers") ;
    const RouteCollection =  client.db("JuSmart").collection("routes") ;
    const SheduleCollection =  client.db("JuSmart").collection("shedules") ;
     //jwt webtoken 
       app.post('/jwt' , async(req , res) =>{
        const user = req.body ;
        const token = jwt.sign(user , process.env.jwt_token_secret , {
          expiresIn: '10h'
        }) ;
          res.send({token}) ;
       })

       // middlewares 
       const verifyToken = (req , res , next)=>{
       console.log("inside verify token" , req.headers.authorization) ;
        if(!req.headers.authorization) {
               return res.status(401).send({message: "unauthorized access"}) ;
        }
        const token = req.headers.authorization.split(" ")[1] ;
        
        console.log(token) ;
        jwt.verify(token , process.env.jwt_token_secret , (err , decode)=>{
          if(err){
            return res.status(401).send({message : "unauthorized access "}) ;
          }
          req.decoded =  decode ;
          next() ;
        })
       }



    //user api 
    app.post("/reg_user" , async(req , res) =>{
      const user = req.body ; 
      //console.log(user) ;
      const query = {email: user.email} ;
      let existingUser =  await  Reg_userCollection.findOne(query) ;
      existingUser =  await DriverCollection.findOne(query) ;
      if(existingUser){
        return res.send({message : "User already exists"  }) ; 
      }
      if(user.role === 'driver'){
         const result =  await DriverCollection.insertOne(user) ;
         res.send(result) ;
      }
      else{
        const result =  await Reg_userCollection.insertOne(user) ;
        res.send(result) ;
      }
     
    })
    // driver update api 
    app.patch('/driverupdate' , async(req , res) =>{
        const updateValue =  req.body ;
        console.log(updateValue) ;
         const filter =  { email: updateValue.email} 
         const updateDoc = {
          $set: {
            busNumber: updateValue.busNumber,
            routeName: updateValue.routeName,
            busType: updateValue.busType,
            status: updateValue.status
          }
         }
         const result =  await DriverCollection.updateOne(filter , updateDoc) ;
         res.send(result) ; 
    })
    // driver stop api 
    app.patch("/driverstop" , async(req , res) =>{
      const stopValue =  req.body ; 
      console.log(stopValue) ;
       const filter =  {email : stopValue.email} 
       const updateDoc = {
        $set: {
          status : stopValue.status
        }
       }
       const result =  await DriverCollection.updateOne(filter , updateDoc) ; 
       res.send(result) ;
    })
    // runing driver list 
    app.get("/runingdriver" , async(req , res) =>{
      const query = {status: "runing"} ;
      const result =  await DriverCollection.find(query).toArray() ;
      res.send(result) ;
    })

// user get api
    app.get("/reg_user/:email" , verifyToken, async(req , res)=>{
      const email = req.params.email ;
      //console.log(req.params) ;
      if(email !== req.decoded.email){
        return res.status(403).send({message : "unauthorized accesss"}) ;
   }
      const query = {email: email} ; 
      let user =  await Reg_userCollection.findOne( query) ;
          if(!user){
            user =  await DriverCollection.findOne(query) ;
          }
      console.log(user) ;
      if(user){
        res.send(user) ;
      }
      else{
        res.send({message : "user is not found"})
      }

    })
    // admin first storage user 
    app.post('/adminusers' , async(req , res) =>{
      const user =  req.body ;
      console.log(user) ;
      const query = {id : user.id} ;
      const existingUser =  await userCollection.findOne(query)  ;
      if(existingUser){
        return res.send({message: "User already exists"}) ;
      }
      const result =  await userCollection.insertOne(user) ;
      res.send(result) ;
    } )
     // first user siginup check user is valide
   app.get('/adminusercheck/:id' , async(req , res) =>{
        const id =  req.params.id ; 
        //console.log(id) ;
         const query = {id : id} ;
         const existingUser =  await userCollection.findOne(query) ;
         if(existingUser){
          return res.send({user:"true" , existingUser}) ;
         }
         res.send({user: "false"}) ;
   })
   // Route insert api 

   app.post("/route" , async(req , res)=>{
     const route = req.body ;
     const result = await RouteCollection.insertOne(route) ;
     res.send(result) ;
   })
   // Route get api
  app.get("/routes" , async(req , res) =>{
       const result =  await RouteCollection.find().toArray() ;
       res.send(result) ;
  })
  // Route update api 
  app.patch("/route" , async(req , res)=>{
    const route =  req.body ;
    console.log(route) ;
    const query =  {_id: new ObjectId(route._id)} ;
    const updateDoc = {
      $set: {
        distance: route.distance,
        endPoint: route.endPoint,
        routeName: route.routeName,
        startPoint: route.startPoint
      }
    }
    const result =  await RouteCollection.updateOne(query , updateDoc) ; 
    res.send(result) ; 
  })
   // Route delete api 
   app.delete("/route/:id" , async(req , res) =>{
    const id =  req.params.id ; 
   // console.log(id) ;
     const query =  {_id : new ObjectId(id)} ; 
      const result =  await RouteCollection.deleteOne(query) ;
      res.send(result) ;
   })
  // shedules add api 
  app.post("/shedules" , async(req , res)=>{
    const shedules =  req.body ;
    const result =  await SheduleCollection.insertOne(shedules) ;
    res.send(result) ;
  })
  // shedules get api 
  app.get('/shedules' , async(req , res)=>{
    const result =  await SheduleCollection.find().toArray() ;
    res.send(result) ;
  })
  // shedules delete api 
  app.delete('/shedules/:id' , async(req, res)=>{
    const id =  req.params.id ;
    console.log(id) ;
    const query =  {_id : new ObjectId(id)} ;
    const result =  await SheduleCollection.deleteOne(query) ;
    res.send(result) ;
  })
  //shedules updated 
  app.patch("/shedules" , async(req, res) =>{
    const data = req.body ; 
    const query = {_id: new ObjectId(data._id)} ;
    const updateDoc = {
      $set:{
        routeName: data.routeName,
        time: data.time,
        busType: data.busType,
        dayType: data.dayType
      }
    }
    const result =  await SheduleCollection.updateOne(query , updateDoc) ;
    res.send(result) ;
  })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);
 

server.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`)
})