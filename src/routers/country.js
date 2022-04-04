const express = require('express')
const router = new express.Router()
const Country = require('../models/country')
const {postCountryName, getCountryList, getCountryById, updateCountryNameById, deleteCountryNamebyId} = require('../controller/country')

router.post('/', (req, res) => {
    postCountryName(req, res)
})

router.get('/list', (req, res) => {
    getCountryList(req, res)
})

router.get('/list/:id', (req, res) => {
    getCountryById(req, res)
})

router.patch('/update/:id', (req, res) => {
    updateCountryNameById(req, res)
})

router.delete('/remove/:id', (req, res) => {
    deleteCountryNamebyId(req, res)
})

module.exports = router
