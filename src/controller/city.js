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
        const pageValue = (req.body.page || 0)
        const limitValue = (req.body.limit || 2)
        const skipValue  = (pageValue * limitValue)
        const cities = await City.find({}).populate('stateId').limit(limitValue).skip(skipValue)
        res.status(201).json({status: true, cities})
    } catch(e){
        res.status(400).json({status: false, message: e})
    }
}

const getCityNameFromState = async (req, res) => {
    try{
        const pageValue = (req.body.page || 0)
        const limitValue = (req.body.limit || 2)
        const skipValue  = (pageValue * limitValue)
        const city = await City.find({stateId: req.params.id}).populate('stateId').limit(limitValue).skip(skipValue)
        if(!city){
            res.status(401).json({status: true, message: 'City not Found!'})
        }
        res.status(201).json({status: true, city})
    }catch(e){
        res.status(400).json({status: false, message: e})
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

module.exports = {postCityName, getCities, getCityNameFromState, getCityById, updateCityNamebyId, deleteCityById}