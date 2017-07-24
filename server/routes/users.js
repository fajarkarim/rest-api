var express = require('express');
var userCtrl = require('../controllers/userCtrl')
var router = express.Router();

/* GET users listing. */
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/ping', userCtrl.auth, userCtrl.ping)

module.exports = router;
