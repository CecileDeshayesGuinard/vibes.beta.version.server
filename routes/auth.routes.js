const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require("../models/User.model");

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const midd = require('../middleware/jwt.middleware')


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

  if (!userName) {
    res.status(400).json({name : "userName", message: "identifiant obligatoire !" }); // erreur 400 = "bad request"
    console.log(errorMessage)
    return
  }
  if (!email) {
    res.status(400).json({name : "email", message: "email obligatoire !" });
    return
  }
  if (!password) {
    res.status(400).json({name : "email", message: "Mot de passe obligatoire !" });
    return
  }
  if(!password.match('^(?=.*[0-9])')) { // regex
    res.status(400).json({message: "mdp non valide, min. 1 chiffre"})
    return
  }
  if(!password.match('(?=.*[a-z])')) { // regex
    res.status(400).json({message: "mdp non valide, min. 1 lettre minuscule"})
    return
  }
  if(!password.match('(?=.*[A-Z])')) { // regex
    res.status(400).json({message: "mdp non valide, min. 1 lettre capitale"})
    return
  }
  if(!password.match('(?=.*[@#$%^&-+=()?!])')) { // regex
    res.status(400).json({message: "mdp non valide, min. 1 caractère spécial"})
    return
  }
  if(!password.match('(?=\\S+$).{8,}$')) { // regex
    res.status(400).json({message: "mdp non valide, min. 8 caractères sans espace"})
    return
  } else {
    console.log('password validate')
  }
  
  User.findOne({email: req.body.email}) // if email exist
  .then(function (userFromDB) {

    if (userFromDB) {
      res.status(409).json({message: "email already taken"}) // if yes, use another email
      return
    }

    const hashedPassword = bcryptjs.hashSync(password) // the password is crypted
    
    const newUser = new User ({ // creation of 4 requested elements in signup page
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    })

    newUser.save()
    .then((newUser)=>{
      res.status(201).json(newUser)
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


router.post('/sessions', function (req, res, next) {
  const { email, password } = req.body;

  if (email === '') {
    res.status(403).json({errorMessage: "identifiant manquant !" })
    return;
  }
  if (password === '') {
    res.status(403).json({errorMessage: "mot de passe manquant !" })
    return;
  }

  User.findOne({email: email}) // we search if the email exist
  .then(userFromDB => {
    if (!userFromDB) {
      res.status(403).json({findErrorMessage: "cet email n'existe pas, rééssayez !"})
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