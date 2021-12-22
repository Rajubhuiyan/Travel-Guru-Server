const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { MongoClient } = require('mongodb');
const { json } = require('body-parser');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(fileUpload());



const port = 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uueml.mongodb.net/travelGuru?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = await client.db("travelGuru");
        const hotelCollection = database.collection('hotelCollection');
        const locationCollection = database.collection('locationCollection');


        app.get('/getLoctionData', async (req, res) => {

            const findData = locationCollection.find({});
            const data = await findData.toArray();
            res.send(data);
        })


        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

    }
    finally {

    }

}

run().catch(console.dir);





app.listen(port)