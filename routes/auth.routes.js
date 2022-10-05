const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const midd = require('../middleware/jwt.middleware')
const router = express.Router()

const User = require('../models/User.model')


/*
███████╗██╗ ██████╗ ███╗   ██╗██╗   ██╗██████╗ 
██╔════╝██║██╔════╝ ████╗  ██║██║   ██║██╔══██╗
███████╗██║██║  ███╗██╔██╗ ██║██║   ██║██████╔╝
╚════██║██║██║   ██║██║╚██╗██║██║   ██║██╔═══╝ 
███████║██║╚██████╔╝██║ ╚████║╚██████╔╝██║     
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝                                               
*/


router.post('/signup', function (req, res, next) {
  const { userName, email, phoneNumber, password } = req.body

  if (userName === '') {
    res.status(403).json({name : "userName", errorMessage: "identifier is mandatory !" });
  }
  if (email === '') {
    res.status(403).json({name : "email", errorMessage: "email is mandatory !" });
  }
  
  User.findOne({userName: userName, email: email}) // if username & email exist
    .then(function (userFromDB) {
      if (userFromDB) {
        res.status(409).json({errorMessage: "user name or email already taken"}) // if yes, use another email
        return
      }
      if(!password.match('^(?=.*[0-9])(?=.*[az])(?=.*[AZ])(?=.*[@#$%^&-+=() ])(?=\\S+$).{8, 15}$ ')) { // regex
        res.status(409).json({errorMessage: "not valid password, you need one capital letter / small letter, one digit and one special symbol"})
      } else {
        console.log('password validate')
      }
  
      const hashedPassword = bcryptjs.hashSync(password) // the password is crypted
  
      User.create({ // creation of 4 requested elements in signup page
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
      })
          .then(function (userFromDB) {
            res.status(201).json({
              user: {
                _id: userFromDB._id,
                userName: userFromDB.userName,
                email: userFromDB.email,
                phoneNumber: PhoneNumber,
              }
            })
          })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})


/*
██╗      ██████╗  ██████╗ ██╗███╗   ██╗
██║     ██╔═══██╗██╔════╝ ██║████╗  ██║
██║     ██║   ██║██║  ███╗██║██╔██╗ ██║
██║     ██║   ██║██║   ██║██║██║╚██╗██║
███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝                                  
*/


router.post('/login', function (req, res, next) {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(403).json({errorMessage: "identifier or password missed !" })
    return;
  }

  User.findOne({email: email}) // we search if the email exist
    .then(userFromDB => {
      if (!userFromDB) {
        res.status(403).json({errorMessage: "this email doesn't exist"})
        return
      }

      const str = jwt.sign({ // if yes, a jwt is edited for one week
        _id: userFromDB._id,
        email: userFromDB.email,
        userName: userFromDB.userName
      }, process.env.TOKEN_SECRET, {algorithm: "HS256", expiresIn: '168h'})

      if (bcryptjs.compareSync(password, userFromDB.password)) {
        res.json({
          authToken: str
        })
      } else {
        res.status(403).json({errorMessage: "wrong password"})  // if good password, the token is valid
        return
      }
    })
    .catch(err => next(err))
})


router.get('/verify', midd, function (req, res, next) { // this route is under midd a valid the registered user
  res.json(req.payload)
})

module.exports = router