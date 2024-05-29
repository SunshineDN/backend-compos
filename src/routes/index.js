const express = require('express');
const router = express.Router();
const SpreadsheetController = require('../controllers/spreadsheet'); //IMPORTANDO A CLASSE DO CONTROLLER

const controller = new SpreadsheetController(); //INSTANCIANDO A CLASSE DO CONTROLLER

router.use(express.json());

router.get("/metadata", controller.getMetadata);

router.get("/getStatistics", controller.getStatisticsRows);

router.get("/getNotices", controller.getNoticesRows);

router.get("/", controller.index);

module.exports = router;