require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tasksRouter = require('./routes/taskRoute');
const middleware = require('./middleware/tasks');

const app = express();
const PORT = process.env.PORT ||3008;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log('Mongodb is connected Successfully')})
.catch((error) => {console.log(`Error in connecting MongoDb - ${error?.message || error}`)})

app.use( "/api",tasksRouter);
app.use(middleware);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
