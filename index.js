const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const shopCollection = database.collection('allproduct');


        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

        app.post('/allproduct', async (req, res) => {
            const addproduct = req.body;
            console.log('new product', addproduct);
            const addingProduct = await shopCollection.insertOne(addproduct);
            res.send(addingProduct);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log(id, user);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await usersCollection.updateOne(filter, updatedUser, options);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete from database', id);
            const query = { _id: new ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
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