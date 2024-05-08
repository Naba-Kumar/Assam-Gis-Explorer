const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("adminDelete");

});

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("adminDelete");

});
module.exports = router;
