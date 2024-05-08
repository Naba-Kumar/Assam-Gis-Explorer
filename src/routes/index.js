const  express = require('express');
const  router = express.Router();

router.use('/', require('./home'));

router.use('/gis', require('./gis'));

router.use('/user', require('./user'));

// router.use('/register', require('./user/register'));

// router.use('/login', require('./user/login'));

// router.use('/forgot', require('./forgot'));

router.use('/catalog', require('./catalog'));

router.use('/admin', require('./admin'));

// router.use('/admin/login', require('./adminLogin'));

// router.use('/admin/Requestds', require('./adminRequests'));

// router.use('/admin/Queries', require('./adminQueries'));

// router.use('/admin/upload', require('./adminUpload'));

// router.use('/admin/delete', require('./adminDelete'));


module.exports = router;

