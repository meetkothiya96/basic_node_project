const User = require('../models/user')
const multer = require('multer')
const fs = require('fs')

const createUser = async(req, res) => {
    try{
        if(!req.file){
            console.log('No file')
        }
        const {firstName, lastName, email, password, phoneNumber, cityId} = req.body
        const dataToSave = {firstName, lastName, email, password,phoneNumber, cityId}
        const user = await new User(dataToSave)
        user.image = req.file.originalname
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({status: true, user, token})
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

const loginUser = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).json({status:true, user, token})
    }catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const logoutUser = async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).json({status: true, message: 'Loggedout successfully'})

    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const logoutAll = async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).json({status: true, message: 'Loggedout from all devices'})
    } catch(e){
        res.status().json({status: false, message: e})
    }
}

const getUsers = async(req, res) => {
    try{
        // const pageValue = (req.body.page || 0)
        // const limitValue = (req.body.limit || 2)
        // const skipValue  = (pageValue * limitValue)
        // const users = await User.find({}).populate('cityId').limit(limitValue).skip(skipValue)
        const user = req.user
        res.status(201).json({status:true, user})
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
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'image']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        res.status(401).json({status: true, message: 'Update field is not present'})
    }
    try{
        //const user = await User.findById(req.params.id).populate('cityId')
        if(req.file){
            const filePath = 'images/' + req.user.image
            fs.unlink(filePath, (res, err) => {
                if(err){
                    console.error(err)
                }
            })
            req.user.image = req.file.originalname
        }
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(201).json({status: true, user: req.user})
    } catch(e){
        res. status(400).send({status: false, message: e})
    }
}

const deleteUserbyId = async(req, res) => {
    try{
        // const user = await User.findById(req.user._id)
        // if(!user){
        //     res.status(401).json({status: true, message: 'User not Found!'})
        // }
        const pathFile = 'images/' + req.user.image
        fs.unlink(pathFile, (res, err) => {
            if(err){
                console.error(err)
            }
        })
        await req.user.remove()
        res.status(201).json({status: true, message: 'Successfully deleted profile'})
    }catch(e){
        res.status(400).json({status: false, message: e})
    }
}

module.exports = {createUser, upload, loginUser, logoutUser,logoutAll, getUsers, getUserById, updateUserbyId, deleteUserbyId}
