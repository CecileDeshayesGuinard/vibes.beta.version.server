// Profile view get the management of add & remove a contact from a list
// Profile view get the possibility to send userReq with the button contact
// Profile view get the possibility to erase a contact with a click on contact button & automattically erase from a list


const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require("../models/User.model");
const UserList = require("../models/UserList.model");
const UserReq = require("../models/UserReq.model");

const midd = require('../middleware/jwt.middleware')


/*
██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗
██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝
██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗  
██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝  
██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝                                                 
*/


/*
╦  ╦╦╔═╗╦ ╦
╚╗╔╝║║╣ ║║║
 ╚╝ ╩╚═╝╚╩╝
*/


router.get('/profile/:userId', midd, function (req, res, next) { // access to user profile

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

router.put('/profile/edit/add/:userListId', midd, function (req, res, next) {

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
            res.status(201).json(userFromDB)
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
  })
  .catch(err => next(err))

})


// remove a contact from the list

router.put('/profile/edit/delete/:userListId', midd, function (req, res, next) {

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
        res.status(201).json(userFromDB)
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


router.post('/profile/create/request', midd, function (req, res, next) {
  
  const sender = req.body.userId;
  const receiver = req.body.userId;

  UserReq.create({
    sender: sender,
    receiver: receiver
  },
  {new:true})
    .then((userReqFromDB)=>{
      res.status(201).json(userReqFromDB)
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


router.delete('profile/delete/request/:userReqId', midd, (req, res, next) => {

    const { userReqId } = req.params;
    
    if (!mongoose.Schema.Types.ObjectId.isValid(userReqId)) {
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


router.put('/profile/edit/request/:userListId', midd, function (req, res, next) {

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