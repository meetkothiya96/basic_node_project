const express = require('express')
const router = new express.Router()
const multer = require('multer')
const {createUser, upload, getUsers, getUserById, updateUserbyId, deleteUserbyId} = require('../controller/user')
const User = require('../models/user')

router.post('/', upload.single('image'), (req, res) => {
    createUser(req, res)
})

router.get('/list', (req, res) => {
    getUsers(req, res)
})

router.get('/list/:id', (req, res) => {
    getUserById(req, res)
})

router.patch('/update/:id', (req, res) => {
    updateUserbyId(req, res)
})

router.delete('/delete/:id', (req, res) => {
    deleteUserbyId(req, res)
})
module.exports = router