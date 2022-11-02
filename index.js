const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
//middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterm01.jgnnfze.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//insert data to mongodb
async function run() {
    try {
        const dataCollection = client.db('car-service').collection('car-service-users');
        const ordersCollection = client.db('car-service').collection('orders')
        //find multiple data from mongodb calling api
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = dataCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })
        //find a single data from mongo db api calling
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await dataCollection.findOne(query)
            res.send(service)
        })

        //orders api : set data using post method from express
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order)
            res.send(result)
        })
        //get orders data for selected logged in user;
        app.get('/orders', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = { email: req.query.email }
            }
            const cursor = ordersCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })
        //delete order 
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await ordersCollection.deleteOne(query)
            res.send(result)

        })
    }

    finally {

    }
}

run().catch(err => console.error(err))



app.get('/', (req, res) => {
    res.send('car servicing server is running')
})
app.listen(port, () => {
    console.log(`This port running on ${port}`)
})