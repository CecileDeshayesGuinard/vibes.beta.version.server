const { expressjwt } = require('express-jwt')

const midd = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload', 
  getToken: function (req) {
    // req.headers.authorization "Bearer 1234123412341234kj123k4jhk123jh4.2134k12jh34k"

    return req.headers.authorization.split(' ')[1]
  }
})

module.exports = midd