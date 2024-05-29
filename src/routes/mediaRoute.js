const express = require('express');
const router = express.Router();
const Media = require('../controllers/Media'); //IMPORTANDO A CLASSE DO CONTROLLER
const fs = require('fs');
const path = require('path');
const mediaFolder = path.join(__dirname, 'public', 'media');

router.use(express.static(mediaFolder));

router.get("/get-medias", Media.getMedia);

router.get("/:filename", Media.sendMedia);

module.exports = router;