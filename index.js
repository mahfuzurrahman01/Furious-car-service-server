const express = require ('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
//middleware 
app.use(cors())
app.use(express.json())
//some changes on gi

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterm01.jgnnfze.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

app.get('/',(req,res)=>{
    res.send('car servicing server is running')
})
app.listen(port,()=>{
    console.log(`This port running on ${port}`)
})