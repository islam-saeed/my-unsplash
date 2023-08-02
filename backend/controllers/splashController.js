const SplashModel = require('../models/ImageModel');
const mongoose = require('mongoose');

const getAllImages = async (req,res) => {
    const splash = await SplashModel.find({}).sort({createdAt: -1})
    res.status(200).json(splash)
}

const getImage = async (req,res) => {
    try{
        const splash = await SplashModel.find({_id: req.params.id})
        res.status(200).json(splash)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const addImage = async (req,res) => {
    
    let imgLabel = req.body.img.label
    let imgURL = req.body.img.url

    try{
        const splash = await SplashModel.create({
            img: {
                label: imgLabel,
                url: imgURL
            }
        })
        res.status(200).json(splash)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteImage = async (req,res) => {
    try{
        const splash = await SplashModel.findOneAndDelete({_id: req.params.id})
        res.status(200).json(splash)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const searchImages = async (req,res) => {
    try{
        const splash = await SplashModel.find({'img.label': RegExp(req.query.label)})
        res.status(200).json(splash)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllImages,
    getImage,
    addImage,
    deleteImage,
    searchImages
}