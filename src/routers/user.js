const express = require('express')
const router = new express.Router()
const multer = require('multer')
const {createUser, upload, loginUser, logoutUser, logoutAll, getUsers, getUserById, updateUserbyId, deleteUserbyId} = require('../controller/user')
const auth = require('../middleware/auth')
const User = require('../models/user')

router.post('/', upload.single('image'), (req, res) => {
    createUser(req, res)
})

router.post('/login', (req, res) => {
    loginUser(req, res)
})

router.post('/logout', auth, (req, res) => {
    logoutUser(req, res)
})

router.post('/logoutAll', auth, (req, res) => {
    logoutAll(req, res)
})

router.get('/list', auth, (req, res) => {
    getUsers(req, res)
}) 

router.get('/list/:id', (req, res) => {
    getUserById(req, res)
})

router.patch('/update/me', upload.single('image'), auth, (req, res) => {
    updateUserbyId(req, res)
})

router.delete('/delete/me', auth, (req, res) => {
    deleteUserbyId(req, res)
})
module.exports = router