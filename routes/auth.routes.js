const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/User.model");

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const midd = require('../middleware/jwt.middleware');

const saltRounds = 10;


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

    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    
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
    res.status(403).json({message: "identifiant manquant !" })
    return;
  }
  if (password === '') {
    res.status(403).json({message: "mot de passe manquant !" })
    return;
  }

  User.findOne({email: req.body.email}) // we search if the email exist
  .then(userFromDB => {
    if (!userFromDB) {
      res.status(403).json({message: "cet email n'existe pas, rééssayez !"})
      return
    }
    
    const passwordCorrect = bcryptjs.compareSync(password, userFromDB.password);

    if (passwordCorrect) {
      const { _id, email } = userFromDB;
      const payload = { _id, email };
      const authToken = jwt.sign( 
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: "168h" }
      );

      res.status(200).json({ authToken: authToken });
    }
    else {
      res.status(401).json({ message: "Mot de passe incorrect" });
      return
    }
  })
  .catch(err => res.status(500).json({ message: "Internal Server Error" }));
})

router.get('/verify', midd, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});


router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});


module.exports = router