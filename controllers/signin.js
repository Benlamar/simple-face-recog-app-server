const handleSigin = (db, bcrypt)=>(req, res)=>{ //calling the (req, res) *usign advance function
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json('Incorrect kind of form fill')
    }

    db.select('email','hash')
    .from('login')
    .where('email','=', email)
    .then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].hash)
        if(isValid){
            db.select().from('users')
            .where('email','=',email)
            .then(user=>res.json(user[0]))
            .catch(err=> res.status(400).json('unable to get users'))
        }
        else{
            res.status(400).json('Wrong credentials');
        }
    })
    .catch(err => res.status(404).json('user not available'))
}

module.exports = {
    handleSigin:handleSigin
}
    

    // if (email === database.users[0].email) {
    //     bcrypt.compare(password, database.users[0].password)
    //         .then(function (result) {
    //             res.json(database.users[0])
    //         });
    // } else {
    //     res.status(400).json('error logging in');
    // }


    // if (req.body.email === database.users[0].email &&
    //     req.body.password === database.users[0].password) {
    //     res.json('signing in ... Successful')
    // }
    // else {
    //     res.status(400).json('error logging in');
    // }
