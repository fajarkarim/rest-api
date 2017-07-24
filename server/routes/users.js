var express = require('express');
var userCtrl = require('../controllers/userCtrl')
var helper = require('../helpers/auth')
var router = express.Router();

/* GET users listing. */
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/:id', helper.auth, userCtrl.ping)

module.exports = router;
