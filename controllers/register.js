const saltRounds = 6;

const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('Incorrect kind of form fill')
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    // Store hash in your password DB.
    // database.users.push({
    //     id: 125,
    //     name: name,
    //     email: email,
    //     password: hash,
    //     entries: 0,
    //     joined: new Date()
    // })

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(email => {
            trx('users')
            .returning('*')
            .insert({
                email: email[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json('unable to register'))
    // res.json(database.users[database.users.length - 1])
}

module.exports = {
    handleRegister: handleRegister
}