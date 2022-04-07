const User = require('../models/user')
const multer = require('multer')
const fs = require('fs')

const createUser = async(req, res) => {
    try{
        if(!req.file){
            console.log('No file')
        }
        const {firstName, lastName, email, phoneNumber, cityId} = req.body
        const dataToSave = {firstName, lastName, email, phoneNumber, cityId}
        const user = await new User(dataToSave)
        user.image = req.file.originalname
        await user.save()
        res.status(201).json({status: true, user})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({
    storage : storage,
    limits:{
        fileSize: 2000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

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
    const allowedUpdates = ['firstName', 'lastName', 'email', 'phoneNumber', 'image']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        res.status(401).json({status: true, message: 'Update field is not present'})
    }
    try{
        const user = await User.findById(req.params.id).populate('cityId')
        if(req.file){
            const filePath = 'images/' + user.image
            fs.unlink(filePath, (res, err) => {
                if(err){
                    console.error(err)
                }
            })
            user.image = req.file.originalname
        }
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
            res.status(401).json({status: true, message: 'User not Found!'})
        }
        const pathFile = 'images/' + user.image
        fs.unlink(pathFile, (res, err) => {
            if(err){
                console.error(err)
            }
        })
        await user.remove()
        res.status(201).json({status: true, user})
    }catch(e){
        res.status(400).json({status: false, message: e})
    }
}

module.exports = {createUser, upload, getUsers, getUserById, updateUserbyId, deleteUserbyId}
