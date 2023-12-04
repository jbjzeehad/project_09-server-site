const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
///////////////////////////
// jbjzeehad1
// oJwt1W811mbSA6VH
///////////////////////////






const uri = "mongodb+srv://jbjzeehad1:oJwt1W811mbSA6VH@brandshop.fsu7nul.mongodb.net/?retryWrites=true&w=majority";

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
        ////////////////////////////////////////////////////

        const database = client.db('usersDB');
        const usersCollection = database.collection('users');



        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user);
            const result = await usersCollection.insertOne(user);
            res.send(result);


        });

        ///////////////////////////////////////////////////////////
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



//////////////////////////////////

// const users = [
//     { id: 1, name: 'Sabana', email: 'sb@Mail.com' },
//     { id: 2, name: 'jabana', email: 'jab@Mail.com' },
//     { id: 3, name: 'Babana', email: 'bb@Mail.com' }
// ]

// app.get('/users', (req, res) => {
//     res.send(users);
// })
// app.post('/users', (req, res) => {
//     console.log('Post api hitting');
//     console.log(req.body);
//     const newUser = req.body;
//     newUser.id = users.length + 1;
//     users.push(newUser);
//     res.send(newUser);
// })

//////////////////////////////////
app.get('/', (req, res) => {
    res.send('Simple CURD is running');
})

app.listen(port, () => {
    console.log(`CRUD is running on PORT: ${port}`);
})