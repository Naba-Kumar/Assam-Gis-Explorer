const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("register");

});

router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("register");

});


module.exports = router;
