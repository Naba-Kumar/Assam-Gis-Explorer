const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("adminQueries");

});

router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("adminQueries");

});
module.exports = router;
