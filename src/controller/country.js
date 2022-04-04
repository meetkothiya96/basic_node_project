const mongoose = require('mongoose')
const Country  =require('../models/country.js')

const postCountryName = async (req, res) => {
    try{
        const {countryName} = req.body
        const dataToSave = {countryName}
        const country = await new Country(dataToSave)
        await country.save()
        res.status(201).json({status: true, country})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const getCountryList = async (req, res) => {
    try{
        const countries = await Country.find({})
        res.json({status:true, countries})
    } catch(e){
        res.status(400).json({status:false, message: e})
    }
}

const getCountryById = async (req, res) => {
    try{
        const _id = req.params.id
        const country = await Country.findById(_id)
        if(!country){
            res.status(401).json({status: true, message: 'country not found'})
        }
        res.status(201).json({status: true, country})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const updateCountryNameById = async (req, res) => {
    try{
        const _id = req.params.id
        const {countryName} = req.body
        const dataToSave = {countryName}
        console.log(_id, dataToSave)
        const country = await Country.findByIdAndUpdate(req.params.id, dataToSave, {new: true, runValidators: true})
        console.log(country)
        if(!country){
            res.status(401).json({status: true, message: 'Country not found!'})
        }
        res.status(201).json({status: true, country})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const deleteCountryNamebyId = async (req, res) => {

    try{
        const country = await Country.findByIdAndDelete(req.params.id)
        if(!country){
            res.status(401).json({status: true, message: 'Country not found'})
        }
        res.status(201).json({status: true, country})
    } catch(e){
        res.status().json({status: false, message: e})
    }
}

module.exports = {postCountryName, getCountryList, getCountryById, updateCountryNameById, deleteCountryNamebyId}