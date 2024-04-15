const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tasksRouter = require('./routes/taskRoute');
const middleware = require('./middleware/tasks');

const app = express();
const PORT = 3008;

app.use(bodyParser.json());

mongoose.connect('mongodb://r7990110:MeNFp7ZzPY9FlA1z@ac-a6mlgvq-shard-00-00.dwp6fi3.mongodb.net:27017,ac-a6mlgvq-shard-00-01.dwp6fi3.mongodb.net:27017,ac-a6mlgvq-shard-00-02.dwp6fi3.mongodb.net:27017/?replicaSet=atlas-14fad1-shard-0&ssl=true&authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log('Mongodb is connected Successfully')})
.catch((error) => {console.log(`Error in connecting MongoDb - ${error?.message || error}`)})

app.use( tasksRouter);
app.use(middleware);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
