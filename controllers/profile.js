const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select()
        .from('users')
        .where({ id: id })
        .then(user => {
            if (user.length) {
                res.json(user)
            } else {
                res.status(404).json('Not Found');
            }
        })

}


module.exports = {
    handleProfile: handleProfile
}

    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // });
    // if (!found) {
    //     res.status(404).json('Not Found');
    // }