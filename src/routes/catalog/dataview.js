const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("Catalog");

});
module.exports = router;
