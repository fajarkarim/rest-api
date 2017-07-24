var express = require('express');
var userCtrl = require('../controllers/userCtrl')
var helper = require('../helpers/auth')
var router = express.Router();

/* GET users listing. */
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)

router.get('/', helper.auth, userCtrl.getAll)
router.get('/:id', helper.auth, userCtrl.getOne)
router.put('/:id', helper.auth, userCtrl.edit)
router.delete('/:id', helper.auth, userCtrl.remove)


module.exports = router;
