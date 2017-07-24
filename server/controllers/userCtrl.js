var User = require('../models/user')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
const SECRET = process.env.SECRET

var register = function (req, res) {
  const saltRounds = 10
  let salt = bcrypt.genSaltSync(saltRounds)
  var hash = bcrypt.hashSync(req.body.password, salt)
  let user = new User({
    email: req.body.email,
    password: hash
  })
  user.save((err, created) => {
    err ? res.status(500).send(err) : res.send(created)
  })
}

var login = function (req, res) {
  User.findOne({ email: req.body.email }, (err, found) => {
    if (err) {
      res.status(500).send(err)
    } else if (!found) {
      res.status(401).send('email not found')
    } else {
      let pass = bcrypt.compareSync(req.body.password, found.password)
      if (pass) {
        let token = jwt.sign({
          email: req.body.email,
          role: req.body.role
        }, SECRET)
        res.send(token)
      } else {
        res.send(401).send('password not match')
      }
    }
  })
}

var auth = function (req, res, next) {
  let token = req.headers.token
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      err ? res.status(403).send('you are not authorized') : res.send(decoded)
    })
  } else {
    res.send('you need login first')
  }
}

var ping = function (req, res) {
  res.send('PONGG !!')
}

module.exports = {
  register,
  login,
  auth,
  ping
}
