require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors')

const splashRouter = require('./routes/splashes')

const app = express();

// middleware

// to allow cross origin requests for development purposes
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

// to parse as json
app.use(express.json())

//to get info about the incoming request during development
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// to use the routes defined at the routes directory and add /img to all of them
app.use('/img',splashRouter);




// db connection and server start
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('listening on port ' + process.env.PORT)
        })
    })
    .catch(err => console.log(err.message))