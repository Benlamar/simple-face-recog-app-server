const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "2fa37759f85e420cabf51e9cbf11ea66",
});

const handleApiCall = (req, res)=>{
    app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a',
    req.body.input)
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Unable to work with api'))
}
 

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            // console.log(entries)
            res.json(entries);
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}