const express = require ('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())

app.get('/',(req,res)=>{
    res.send('car servicing server is running')
})
app.listen(port,()=>{
    console.log(`This port running on ${port}`)
})