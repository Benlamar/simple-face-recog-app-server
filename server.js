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
        host: 'localhost',
        port: 5051,
        user: 'postgres',
        password: 'root',
        database: 'smart_brain'
    }
});

/*const database = {
    users: [
        {
            id: 123,
            name: 'John',
            email: 'john@gmail.com',
            password: '$2b$10$ql2LnsJEQuLhmJmGsq028O6W7jtvTG8VHYOIBYH20NAa1UrLSIHjy',
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'sallypassword',
            entries: 0,
            joined: new Date()
        }
    ]
};*/

app.get('/', (req, res) => {
    db.select()
        .from('users')
        .then(user => res.send(user))
        .catch(err => res.status(404).json('Error'))
});


//For signing in
app.post('/signin',
    signin.handleSigin(db, bcrypt) //using advance function, since (req, res) will be sent as a function. *check the signin.js in the controlls
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

app.listen(3000, () =>
    console.log('app, running')
);
