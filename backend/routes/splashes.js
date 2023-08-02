const express = require('express')

const {
    getAllImages,
    getImage,
    addImage,
    deleteImage,
    searchImages
} = require('../controllers/splashController')

const router = express.Router()

router.get('/',getAllImages);

router.get('/search',searchImages);

router.get('/:id',getImage);

router.post('/',addImage);

router.delete('/:id',deleteImage);


module.exports = router;