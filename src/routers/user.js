const express = require('express')
const router = new express.Router()
const {createUser, getUsers, getUserById, updateUserbyId, deleteUserbyId} = require('../controller/user')

router.post('/', (req, res) => {
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