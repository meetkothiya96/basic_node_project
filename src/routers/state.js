const express = require('express')
const router = new express.Router()
const State = require('../models/state.js')
const {postStateName, listStateNames, getStateNameFromCountry, stateNameById, updateStateNamebyId, deleteStateNamebyId} = require('../controller/state')

router.post('/', (req, res) => {
    postStateName(req, res)
})

router.get('/list', (req, res) => {
    listStateNames(req, res)
})

router.get('/listByCountryId/:id', (req, res) => {
    getStateNameFromCountry(req, res)
})

router.get('/list/:id', (req, res) => {
    stateNameById(req, res)
})

router.patch('/update/:id', (req, res) => {
    updateStateNamebyId(req, res)
})

router.delete('/delete/:id', (req, res) => {
    deleteStateNamebyId(req, res)
})

module.exports = router