const City = require('../models/city')

const postCityName = async(req, res) => {
    try{
        const {cityName, stateId} = req.body
        const dataToSave = {cityName, stateId}
        const city = await new City(dataToSave)
        await city.save()
        res.status(201).json({status: true, city}) 
    } catch(e){
        res.status().json({status: false, message: e})
    }
}

const getCities = async(req, res) => {
    try{
        const cities = await City.find({}).populate('stateId')
        res.status(201).json({status: true, cities})
    } catch(e){
        res.status().json({status: false, message: e})
    }
}

const getCityById = async(req, res) => {
    try{
        const city = await City.findById(req.params.id).populate('stateId')
        if(!city){
            res.status(401).json({status: true, message: 'City not Found!'})
        }
        res.status(201).json({status: true, city})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const updateCityNamebyId = async(req, res) => {
    try{
        const {cityName} = req.body
        const dataToUpdate = {cityName}
        const city = await City.findByIdAndUpdate(req.params.id, dataToUpdate, {new: true, runValidators: true}).populate('stateId')
        if(!city){
            res.status(401).json({status: true, message: 'City Not Found!'})
        }
        res.status(201).json({status: true, city})
    } catch(e){
        res.status().json({status: false, message: e})
    }
}

const deleteCityById = async(req, res) => {
    try{
        const city = await City.findById(req.params.id).populate('stateId')
        await city.remove()
        if(!city){
            res.status(401).json({status: true, message: 'City not Found!'})
        }
        res.status(201).json({status: true, city})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

module.exports = {postCityName, getCities, getCityById, updateCityNamebyId, deleteCityById}