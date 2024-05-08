const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("adminLogin");

});

router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("adminLogin");

});
module.exports = router;
