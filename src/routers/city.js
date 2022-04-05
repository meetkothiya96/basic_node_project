const express = require('express')
const router = new express.Router()
const {postCityName, getCities, getCityNameFromState, getCityById, updateCityNamebyId, deleteCityById} = require('../controller/city')

router.post('/', (req, res) => {
    postCityName(req, res)
})

router.get('/list', (req, res) => {
    getCities(req, res)
})

router.get('/listByStateId/:id', (req, res) => {
    getCityNameFromState(req, res)
})

router.get('/list/:id', (req, res) => {
    getCityById(req, res)
})

router.patch('/update/:id', (req, res) => {
    updateCityNamebyId(req, res)
})

router.delete('/delete/:id', (req, res) => {
    deleteCityById(req, res)
})

module.exports = router