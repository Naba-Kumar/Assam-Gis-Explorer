const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("login");

});

router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("login");

});

module.exports = router;
