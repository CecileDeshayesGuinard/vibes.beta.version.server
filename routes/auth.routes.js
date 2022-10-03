const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const midd = require('../middleware/jwt.middleware')
const router = express.Router()

const User = require('../models/User.model')


router.post('/signup', function (req, res, next) {
  const { userName, email, phoneNumber, password } = req.body
  
  User.findOne({userName: userName, email: email}) // if username & email exist
    .then(function (userFromDB) {
      if (userFromDB) {
        res.status(409).json({errorMessage: "user name or email already taken"})
        return
      }
  
      const hashedPassword = bcryptjs.hashSync(password)
  
      User.create({
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
      })
        .then(function (userFromDB) {
          res.status(201).json({
            user: {
              _id: userFromDB._id,
              email: userFromDB.email,
              phoneNumber: PhoneNumber,
            }
          })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})


router.post('/login', function (req, res, next) {
  const { email, password } = req.body

  User.findOne({email: email})
    .then(userFromDB => {
      if (!userFromDB) {
        res.status(403).json({errorMessage: "this email doesn't exist"})
        return
      }

      const str = jwt.sign({
        _id: userFromDB._id,
        email: userFromDB.email,
        userName: userFromDB.userName
      }, process.env.TOKEN_SECRET, {algorithm: "HS256", expiresIn: '168h'})

      if (bcryptjs.compareSync(password, userFromDB.password)) {
        res.json({
          authToken: str
        })
      } else {
        res.status(403).json({errorMessage: "Wrong password"})
        return
      }
    })
    .catch(err => next(err))
})

router.get('/verify', midd, function (req, res, next) {
  res.json(req.payload)
})

module.exports = router