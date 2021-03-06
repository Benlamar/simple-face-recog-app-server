const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(express.json())
app.use(cors())

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl:true
    }
});

app.get('/', (req, res) => {
    res.send("It is OK")
});


//For signing in
app.post('/signin',
    signin.handleSigin(db, bcrypt) 
);

//For register
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
});

//update uers enteries
app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
})

//For image
app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})
app.listen(process.env.PORT || 3000, () =>
    console.log(`app, running ${process.env.PORT}`)
);