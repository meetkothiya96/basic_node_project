const State = require('../models/state')
const mongoose = require('mongoose')

const postStateName = async (req, res) => {
    try{
        const {stateName, countryId} = req.body
        const dataToSave = {stateName, countryId}
        const state = await new State(dataToSave)
        await state.save()
        res.status(201).json({status: true, state})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const listStateNames = async (req, res) => {
    try{
        const states = await State.find({}).populate('countryId') 
        console.log(states)
        res.status(201).json({status: true, states})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const stateNameById = async (req, res) => {
    try{
        const state = await State.findById(req.params.id).populate('countryId')
        if(!state){
            res.status(401).json({status: true, message: 'State not Found!!'})
        }
        res.status(201).json({status: true, state})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const updateStateNamebyId = async(req, res) => {
    try{
        const {stateName} = req.body
        const dataToUpdate = {stateName}
        const state = await State.findByIdAndUpdate(req.params.id, dataToUpdate, {new: true, runValidators: true}).populate('countryId')
        if(!state){
            res.status(401).json({status:true, message: 'State not Found!'})
        }
        res.status(201).json({status: true, state})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const deleteStateNamebyId = async (req, res) => {
    try{
        const state = await State.findByIdAndDelete(req.params.id).populate('countryId')
        if(!state){
            res.status(401).json({status: true, message: 'State not Found!'})
        }
        res.status(201).json({status: true, state})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

module.exports = { postStateName, listStateNames, stateNameById, updateStateNamebyId, deleteStateNamebyId }