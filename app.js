const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Database 
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to Database '+config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Databse error: '+ err);
});

// Routes
const users = require('./routes/users');

const app = express();

// port for app
const port = 3000;

// enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//-------------------
// Middlewares
//-------------------

// Body Parser
app.use(bodyParser.json()); 

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

// Index Route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
});

// start server and listen on port
app.listen(port, () => {
    console.log('Server started on port '+port)
})