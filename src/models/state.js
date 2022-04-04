const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({

    stateName: {
        type: String,
        required: true,
        trim: true
    }, countryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Country'
    }
})

const State = mongoose.model('State', stateSchema)

module.exports = State