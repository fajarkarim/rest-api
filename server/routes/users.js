var express = require('express');
var userCtrl = require('../controllers/userCtrl')
var router = express.Router();

/* GET users listing. */
router.post('/register', userCtrl.register)
router.post('/auth', userCtrl.auth)

module.exports = router;
