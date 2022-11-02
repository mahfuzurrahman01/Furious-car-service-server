const express = require ('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
//middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterm01.jgnnfze.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//insert data to mongodb
async function run(){
    try{
    const dataCollection = client.db('car-service').collection('car-service-users')
    const user = {name: 'mahfuzur',email:'mfz@gmail.com'}
    const result = await dataCollection.insertOne(user)
    console.log(result)
    }
    finally{

    }
}

run().catch(err => console.log(err))



app.get('/',(req,res)=>{
    res.send('car servicing server is running')
})
app.listen(port,()=>{
    console.log(`This port running on ${port}`)
})