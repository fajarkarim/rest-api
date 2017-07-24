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
          id: found.id,
          email: found.email,
          role: found.role
        }, SECRET)
        res.send(token)
      } else {
        res.send(401).send('password not match')
      }
    }
  })
}

var ping = function (req, res) {
  res.send('PONGG !!')
}

var getAll = function (req, res) {
  User.find({}, (err, users) => {
    err ? res.status(500).send(err) : res.send(users)
  })
}

var getOne = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    err ? res.status(500).send(err) : res.send(user)
  })
}

var edit = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(500).send(err)
    else {
      let user = new User({
        email: req.body.email,
        password: req.body.password
      })
    }
  })
}

var remove = function (req, res) {
  let response = {}
  User.findByIdAndRemove(req.params.id, (err, destroyed) => {
    if (err) {
      res.status(500).send(err)
    } else {
      response.message = `Successful destroyed`
      response.user = destroyed
    }
  })
}

module.exports = {
  register,
  login,
  ping,
  getAll,
  getOne,
  edit,
  remove
}
