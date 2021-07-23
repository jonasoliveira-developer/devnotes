const mongoose = require('mongoose')

const dbConfig ='mongodb+srv://user:user@cluster0.muohj.mongodb.net/annotations?retryWrites=true&w=majority'

const dbConnection = mongoose.connect(dbConfig, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

module.exports = dbConnection


