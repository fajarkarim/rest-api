var jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

var auth = function (req, res, next) {
  let token = req.headers.token
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send(err)
      } else if (decoded) {
        if (decoded.role == 'admin') {
          next()
        } else if (decoded.role == 'user') {
          if (req.params.id === decoded.id) {
            next()
          } else {
            res.status(401).send('not authorized')
          }
        }
      }
    })
  } else {
    res.send('you need login first')
  }
}

module.exports = {
  auth
}
