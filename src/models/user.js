const mongoose = require('mongoose')
const validator = require('validator')
const multer = require('multer')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    }, lastName: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(validator.isEmail(value) === false){
                throw new Error('Should be an email')
            }
        }
    }, phoneNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(validator.isMobilePhone(value) === false){
                throw new Error('Should be a valid phone number')
            }
        }
    }, cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'City'
    }, image: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User