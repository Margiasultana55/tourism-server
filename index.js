const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 5000;


//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9nw5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect();
        const databse = client.db("online_order");
        const productsCollecton = databse.collection("services");
        const userCollecton = databse.collection("userss");


        //get order API
        app.get('/userss', async (req, res) => {
            const cursor = userCollecton.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        //Post order API
        app.post('/userss', async (req, res) => {
            const order = req.body;
            const result = await userCollecton.insertOne(order);
            res.json(result);


        })

        //Get product API
        app.get('/services', async (req, res) => {
            const cursor = productsCollecton.find({});
            const services = await cursor.toArray();
            res.send(services);
        })



    }
    finally {

    }


}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running');
});
app.listen(port, () => {
    console.log('server running at port', port);
})