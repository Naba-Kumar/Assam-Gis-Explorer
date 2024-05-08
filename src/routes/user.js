const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Your OpenLayers logic here
    res.render("userRegister");

});
router.post('/', (req, res) => {
    // Your OpenLayers logic here
    // res.render("query");

});


router.get('/login', (req, res) => {
    // Your OpenLayers logic here
    res.render("userLogin");

});
router.post('/logn', (req, res) => {
    // Your OpenLayers logic here
    // res.render("login");

});

router.get('/forgot', (req, res) => {
    // Your OpenLayers logic here
    res.render("userForgot");

});
router.post('/forgot', (req, res) => {
    // Your OpenLayers logic here
    // res.render("query");

});


module.exports = router;
