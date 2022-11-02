const express = require ('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
//middleware 
app.use(cors())
app.use(express.json())

//user pass
// car-service
//cdtAWu1kRiJHV9dM

user =process.env.DB_USER
pass = process.env.DB_PASS
const uri = "mongodb+srv://<username>:<password>@clusterm01.jgnnfze.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get('/',(req,res)=>{
    res.send('car servicing server is running')
})
app.listen(port,()=>{
    console.log(`This port running on ${port}`)
})