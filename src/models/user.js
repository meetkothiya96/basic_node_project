const mongoose = require('mongoose')
const validator = require('validator')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(validator.contains(value,'password')){
                throw new Error('Password field shouldn\'t contain "password"')
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
    }, tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function() {

    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, 'userlogin')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
 
const User = mongoose.model('User', userSchema)

module.exports = User