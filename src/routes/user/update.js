const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("update");

});

router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("update");

});


module.exports = router;
