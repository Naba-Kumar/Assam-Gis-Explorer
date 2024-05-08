const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("adminUpload");

});


router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("adminUpload");

});
module.exports = router;
