const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("adminRequests");

});

router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("adminRequests");

});
module.exports = router;
