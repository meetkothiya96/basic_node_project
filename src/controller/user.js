const User = require('../models/user')

const createUser = async(req, res) => {
    try{
        const {firstName, lastName, email, phoneNumber, cityId} = req.body
        const dataToSave = {firstName, lastName, email, phoneNumber, cityId}
        const user = await new User(dataToSave)
        await user.save()
        res.status(201).json({status: true, user})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const getUsers = async(req, res) => {
    try{
        const pageValue = (req.body.page || 0)
        const limitValue = (req.body.limit || 2)
        const skipValue  = (pageValue * limitValue)
        const users = await User.find({}).populate('cityId').limit(limitValue).skip(skipValue)
        res.status(201).json({status:true, users})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const getUserById = async(req, res) => {
    try{
        const user = await User.findById(req.params.id).populate('cityId')
        if(!user){
            res.status(401).json({status: true, message: 'User not Found!'})
        }
        res.status(201).json({status: true, user})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const updateUserbyId = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'phoneNumber']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        res.status(401).json({status: true, message: 'Update field is not present'})
    }
    try{
        const user = await User.findById(req.params.id).populate('cityId')
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if(!user){
            res.status(401).json({status: true, message: 'User not Found'})
        }
        res.status(201).json({status: true, user})
    } catch(e){
        res. status(400).send({status: false, message: e})
    }
}

const deleteUserbyId = async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            res.status().json({status: true, message: 'User not Found!'})
        }
        await user.remove()
        res.status(201).json({status: true, user})
    }catch(e){
        res.status(400).json({status: false, message: e})
    }
}

module.exports = {createUser, getUsers, getUserById, updateUserbyId, deleteUserbyId}
