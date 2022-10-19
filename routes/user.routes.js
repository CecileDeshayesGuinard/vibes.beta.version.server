const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const User = require("../models/User.model");
const UserList = require("../models/UserList.model");
const UserReq = require("../models/UserReq.model");

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


router.get('/user/:userId', (req, res, next) => {

  const { userId } = req.params; // induction on client side that parameters have same name than in the model 

  if (!mongoose.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
    res.status(400).json({ message: 'Problème pour trouver le compte' });
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


router.put('/user/:userId', fileUploader.single('userPhoto'), (req, res, next) => {

  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'L\'id spécifié n\'est pas valide' });
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


router.delete('/user/:userId', (req, res, next) => {

  const { userId } = req.params;
    
  if (!mongoose.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
    res.status(400).json({ message: 'Problème pour effacer le compte' });
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

  const { user, name } = req.body;

  const newUserList = new UserList ({
    user: user,
    name: name
  })

  newUserList.save()
  .then((newUserListFromDB) => {
    res.status(201).json(newUserListFromDB)
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


router.get('/list', function (req, res, next) { // access to userList

  UserList.find()
  .then(function (userListFromDB) {
    res.json(userListFromDB)
  })
  .catch(err => next(err))

})


router.get('/List/:id', (req, res, next) => {

const { userListId } = req.params; // induction on client side that parameters have same name than in the model

  if (!mongoose.Types.ObjectId.isValid(userListId)) {
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


router.put('/list/:id', (req, res, next) => {

  const { userListId } = req.params; // induction on client side that parameters have same name than in the model
  
  if (!mongoose.Types.ObjectId.isValid(userListId)) { // update list
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


router.delete('/list/:id', (req, res, next) => {

  const { userListId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userListId)) { // update
    res.status(400).json({ message: 'problem to find the list' });
    return;
  }  

  UserList.findByIdAndRemove(userListId)
  .then(() => res.status(204).send())
  .catch(error => res.json(error));

});



/*
██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗
██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝
██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗  
██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝  
██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝                                                 
*/


// Profile view get the management of add & remove a contact from a list
// Profile view get the possibility to send userReq with the button contact
// Profile view get the possibility to erase a contact with a click on contact button & automattically erase from a list


/*
╦  ╦╦╔═╗╦ ╦
╚╗╔╝║║╣ ║║║
 ╚╝ ╩╚═╝╚╩╝
*/


router.get('/profile/:id', function (req, res, next) { // access to user profile

  User.find()
  .then(function (userFromDB) {
    res.json(userFromDB)
  })
  .catch(err => next(err))

})


/*
╔═╗╔╦╗╦╔╦╗╦╔═╗╔╗╔  ╔╦╗╔═╗  ╦ ╦╔═╗╔═╗╦═╗╦  ╦╔═╗╔╦╗
║╣  ║║║ ║ ║║ ║║║║   ║ ║ ║  ║ ║╚═╗║╣ ╠╦╝║  ║╚═╗ ║ 
╚═╝═╩╝╩ ╩ ╩╚═╝╝╚╝   ╩ ╚═╝  ╚═╝╚═╝╚═╝╩╚═╩═╝╩╚═╝ ╩ 
*/


// add a contact to the list

router.put('/profile/edit/add/:userListId', function (req, res, next) {

  const list = req.body.userListId;

  UserList.put({
    list: list
  })
  .then(function (userFromDB) {

    UserList.findById(req.body.userListId)
      .then(function (userListFromDB) {
        userListFromDB.user.push(userFromDB._id) // add a user to the list
        userListFromDB.save()
          .then(function () {
            res.status(201).json(userListFromDB)
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
  })
  .catch(err => next(err))

})


// remove a contact from the list

router.put('/profile/edit/delete/:userListId', function (req, res, next) {

  const list = req.body.userListId;  

  UserList.put({
    list: list
  })
  .then(function (userFromDB) {
  
    UserList.findById(req.body.userListId)
    .then(function (userListFromDB) {
      userListFromDB.user.remove(userFromDB._id) // supp a user to the list
      userListFromDB.save()
      .then(function () {
        res.status(201).json(userListFromDB)
      })
      .catch(err => next(err))
    })
    .catch(err => next(err))
  })
  .catch(err => next(err))

})


/*
██╗   ██╗███████╗███████╗██████╗     ██████╗ ███████╗ ██████╗ ██╗   ██╗███████╗███████╗████████╗
██║   ██║██╔════╝██╔════╝██╔══██╗    ██╔══██╗██╔════╝██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝
██║   ██║███████╗█████╗  ██████╔╝    ██████╔╝█████╗  ██║   ██║██║   ██║█████╗  ███████╗   ██║   
██║   ██║╚════██║██╔══╝  ██╔══██╗    ██╔══██╗██╔══╝  ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   
╚██████╔╝███████║███████╗██║  ██║    ██║  ██║███████╗╚██████╔╝╚██████╔╝███████╗███████║   ██║   
 ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝                                                                                                
*/


/*
╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗  ╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗
║  ╠╦╝║╣ ╠═╣ ║ ║╣   ╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║ 
╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝  ╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩ 
*/


router.post(`/requests`, function (req, res, next) { // tu ne dois pas mettre ?mahcin=truc dans la route: n'importe quelle route peut se voir "ajouter" une query-string ?machin=truc => donc on la met pas
  

  // maintennant, pour recuperer la valeur de ?user= : tu dois utiliser req.query !

  const { sender, receiver } = req.query;

  const newUserReq = new UserReq ({
    sender: sender,
    receiver: receiver
  })

  newUserReq.save()
  .then((newUserReqFromDB)=>{
    res.status(201).json(newUserReqFromDB)
  })
  .catch((err)=>{
  console.log('error creation user request',err)
  next(err)
  })
})



/*
╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗  ╦═╗╔═╗╔═╗╦ ╦╔═╗╔═╗╔╦╗
╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║   ╠╦╝║╣ ╠╣ ║ ║╚═╗║╣  ║║
╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩   ╩╚═╚═╝╚  ╚═╝╚═╝╚═╝═╩╝
*/


router.delete('/request/:id', (req, res, next) => {

    const { userReqId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userReqId)) {
        res.status(400).json({ message: 'Request erased, no relation between users' });
        return;
    }

    UserReq.findByIdAndRemove(userReqId)
    .then(() => res.status(204).send())
    .catch(error => res.json(error));

});


/*
╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗  ╔═╗╔═╗╔═╗╔═╗╔═╗╔╦╗╔═╗╔╦╗
╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║   ╠═╣║  ║  ║╣ ╠═╝ ║ ║╣  ║║
╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩   ╩ ╩╚═╝╚═╝╚═╝╩   ╩ ╚═╝═╩╝
*/


router.put('/requests/:id/accept', function (req, res, next) {

    const contacts = req.body.userId;

    User.put({
      contacts: contacts
    })
    .then(function (userFromDB) {

      User.findById(req.body.userId)
      .then(function (userReqFromDB) {
        userReqFromDB.user.push(userFromDB._id) // add a user to the contacts
        userReqFromDB.save()
        .then(function () {
          res.status(201).json(userFromDB)
          UserReq.findByIdAndRemove(userReqId) // we erase the userReq
        .then(() => res.status(204).send())
        .catch(error => res.json(error));
        })
        .catch(err => next(err))
      })
      .catch(err => next(err))
    })
    .catch(err => next(err))
})


module.exports = router;