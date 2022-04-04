const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({

    cityName: {
        type: String,
        required: true,
        trim: true
    }, stateId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'State'
    }
})

const City = mongoose.model('City', citySchema)

module.exports = City