const express = require('express');
const router = express.Router();
const gisController = require('../controllers/gisController');

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.sendFile(path.join(__dirname, 'public', 'openlayers', 'gis.html'));

});
module.exports = router;
