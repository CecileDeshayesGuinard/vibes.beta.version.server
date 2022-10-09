const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const User = require("../models/User.model");
const UserList = require("../models/UserList.model");

const fileUploader = require('../config/cloudinary.config');
const midd = require('../middleware/jwt.middleware')




/*
██╗   ██╗███████╗███████╗██████╗      █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
██║   ██║██╔════╝██╔════╝██╔══██╗    ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
██║   ██║███████╗█████╗  ██████╔╝    ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   
██║   ██║╚════██║██╔══╝  ██╔══██╗    ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   
╚██████╔╝███████║███████╗██║  ██║    ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   
 ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝                                                                                                  
*/


/*
╦ ╦╔═╗╔═╗╦═╗  ╦  ╦╦╔═╗╦ ╦
║ ║╚═╗║╣ ╠╦╝  ╚╗╔╝║║╣ ║║║
╚═╝╚═╝╚═╝╩╚═   ╚╝ ╩╚═╝╚╩╝
*/


router.get('/users', midd, function (req, res, next) { // access to users

  User.find()
  .then(function (userFromDB) {
    res.json(userFromDB)
  })
  .catch(err => next(err))

})


router.get('/user/:id', midd, (req, res, next) => {

  const { userId } = req.params; // induction on client side that parameters have same name than in the model 

  if (!mongoose.Schema.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
    res.status(400).json({ message: 'problem to find the account' });
    return;
  }

  User.findById(userId)
  .populate('user', 'userList', 'userReq', 'eventReq', 'event')
  .then(user => res.status(200).json(user))
  .catch(error => res.json(error));

});


/*
╦ ╦╔═╗╔═╗╦═╗  ╔═╗╔╦╗╦╔╦╗
║ ║╚═╗║╣ ╠╦╝  ║╣  ║║║ ║ 
╚═╝╚═╝╚═╝╩╚═  ╚═╝═╩╝╩ ╩ 
*/


router.put('/user/:id', fileUploader.single('userPhoto'), midd, (req, res, next) => {

  const { userId } = req.params; // induction on client side that parameters have same name than in the model (management via react)


  if (!mongoose.Schema.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
    res.status(400).json({ message: 'problem to find the account' });
    return;
  }

  const userPhoto = req.file.path;
  
  User.findByIdAndUpdate(userId, req.body, { new: true, userPhoto: userPhoto})
  .then((updatedUser) => res.json(updatedUser))
  .catch(error => res.json(error));

});


/*
╦ ╦╔═╗╔═╗╦═╗  ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
║ ║╚═╗║╣ ╠╦╝   ║║║╣ ║  ║╣  ║ ║╣ 
╚═╝╚═╝╚═╝╩╚═  ═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/


router.delete('/user/:userId', midd, (req, res, next) => {

  const { userId } = req.params;
    
  if (!mongoose.Schema.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
    res.status(400).json({ message: 'problem to find the account' });
    return;
  }

  User.findByIdAndRemove(userId)
  .then(() => res.status(204).send())
  .catch(error => res.json(error));

});



/*
██╗   ██╗███████╗███████╗██████╗     ██╗     ██╗███████╗████████╗
██║   ██║██╔════╝██╔════╝██╔══██╗    ██║     ██║██╔════╝╚══██╔══╝
██║   ██║███████╗█████╗  ██████╔╝    ██║     ██║███████╗   ██║   
██║   ██║╚════██║██╔══╝  ██╔══██╗    ██║     ██║╚════██║   ██║   
╚██████╔╝███████║███████╗██║  ██║    ███████╗██║███████║   ██║   
 ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝╚══════╝   ╚═╝                                                              
*/


/*
╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗  ╦  ╦╔═╗╔╦╗
║  ╠╦╝║╣ ╠═╣ ║ ║╣   ║  ║╚═╗ ║ 
╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝  ╩═╝╩╚═╝ ╩ 
*/


router.post('/list', midd, function (req, res, next) {

  const user = req.body.userId;
  const name = req.body.name;

  UserList.create( req.params.id, {
    user: user,
    name: name
  },
  {new:true})
    .then((userListFromDB)=>{
      res.status(201).json(userListFromDB)
    })
    .catch((err)=>{
    console.log('error creation list',err)
    next(err)
    })
})


/*
╦  ╦╔═╗╔╦╗  ╦  ╦╦╔═╗╦ ╦
║  ║╚═╗ ║   ╚╗╔╝║║╣ ║║║
╩═╝╩╚═╝ ╩    ╚╝ ╩╚═╝╚╩╝
*/


router.get('/list', midd, function (req, res, next) { // access to userList

  UserList.find()
  .then(function (userListFromDB) {
    res.json(userListFromDB)
  })
  .catch(err => next(err))

})


router.get('/List/:id', midd, (req, res, next) => {

const { userListId } = req.params; // induction on client side that parameters have same name than in the model

  if (!mongoose.Schema.Types.ObjectId.isValid(userListId)) {
      res.status(400).json({ message: 'problem to find the list' });
      return;
  }
  
  UserList.findById(userListId)
  .populate('user')
  .then(user => res.status(200).json(user))
  .catch(error => res.json(error));

});



/*
╔═╗╔╦╗╦╔╦╗  ╦  ╦╔═╗╔╦╗
║╣  ║║║ ║   ║  ║╚═╗ ║ 
╚═╝═╩╝╩ ╩   ╩═╝╩╚═╝ ╩ 
*/


router.put('/list/:id', midd, (req, res, next) => {

  const { userListId } = req.params; // induction on client side that parameters have same name than in the model
  
  if (!mongoose.Schema.Types.ObjectId.isValid(userListId)) { // update list
      res.status(400).json({ message: 'problem to find the list' });
      return;
  }
  
  User.findByIdAndUpdate(userListId, req.body, { new: true })
  .then((updatedUserList) => res.json(updatedUserList))
  .catch(error => res.json(error));

});



/*
╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗  ╦  ╦╔═╗╔╦╗
 ║║║╣ ║  ║╣  ║ ║╣   ║  ║╚═╗ ║ 
═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝  ╩═╝╩╚═╝ ╩ 
*/


router.delete('/list/:id', midd, (req, res, next) => {

  const { userListId } = req.params;
  
  if (!mongoose.Schema.Types.ObjectId.isValid(userListId)) { // update
    res.status(400).json({ message: 'problem to find the list' });
    return;
  }  

  UserList.findByIdAndRemove(userListId)
  .then(() => res.status(204).send())
  .catch(error => res.json(error));

});


module.exports = router;