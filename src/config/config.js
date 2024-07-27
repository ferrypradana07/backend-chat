const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const URI = 'mongodb+srv://ferrypradana228:2eHGFoZHniJzIJP1@cluster0.2rmnheq.mongodb.net/'
// const mongoURI = 'mongodb+srv://ferrypradana228:2eHGFoZHniJzIJP1@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority' 
// atau URI MongoDB Atlas Anda
// Password = 2eHGFoZHniJzIJP1
mongoose.connect(URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Schemas, models, routes, and other logic...

app.listen(3000, () => console.log('Server running on port 3000'));
