const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require("../models/User.model");
const Contacts = require("../models/Contacts.model");
const UserList = require("../models/UserList.model");
const UserReq = require("../models/UserReq.model");
const Event = require("../models/Event.model");
const EventReq = require("../models/EventReq.model");

const fileUploader = require('../config/cloudinary.config');

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
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


router.get('/account/:userId', midd, function (req, res, next) { // access to user account
  User.find()
    .then(function (userFromDB) {
      res.json(userFromDB)
    })
    .catch(err => next(err))
})


router.get('/account/:userId', midd, (req, res, next) => {
    const { userId } = req.params; // induction on client side that parameters have same name than in the model

    if (!mongoose.Schema.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
        res.status(400).json({ message: 'problem to find the contact' });
        return;
    }

    User.findById(userId)
        .populate('user')
        .then(user => res.status(200).json(user))
        .catch(error => res.json(error));
});


/*
╦ ╦╔═╗╔═╗╦═╗  ╔═╗╔╦╗╦╔╦╗
║ ║╚═╗║╣ ╠╦╝  ║╣  ║║║ ║ 
╚═╝╚═╝╚═╝╩╚═  ╚═╝═╩╝╩ ╩ 
*/


router.put('/account/edit/:userId', midd, (req, res, next) => {
    const { userId } = req.params; // induction on client side that parameters have same name than in the model

    if (!mongoose.Schema.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
        res.status(400).json({ message: 'problem to find the contact' });
        return;
    }
   
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch(error => res.json(error));
});


/*
╦ ╦╔═╗╔═╗╦═╗  ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
║ ║╚═╗║╣ ╠╦╝   ║║║╣ ║  ║╣  ║ ║╣ 
╚═╝╚═╝╚═╝╩╚═  ═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/


router.delete('/account/delete/:userId', midd, (req, res, next) => {
    const { userId } = req.params;
    
    if (!mongoose.Schema.Types.ObjectId.isValid(userId)) { // update to contacts (oter users)
        res.status(400).json({ message: 'problem to find the contact' });
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


router.post('/account/create/userList', midd, function (req, res, next) {
  
    UserList.create({
      user: req.body.userId,
      name: req.body.name,
    })
})


/*
╦  ╦╔═╗╔╦╗  ╦  ╦╦╔═╗╦ ╦
║  ║╚═╗ ║   ╚╗╔╝║║╣ ║║║
╩═╝╩╚═╝ ╩    ╚╝ ╩╚═╝╚╩╝
*/


router.get('/account/userList/:userListId', midd, function (req, res, next) { // access to userList
    UserList.find()
      .then(function (userListFromDB) {
        res.json(userListFromDB)
      })
      .catch(err => next(err))
})


router.get('/account/userList/:userListId', midd, (req, res, next) => {
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


router.put('/account/edit/:userListId', midd, (req, res, next) => {
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


router.delete('/account/delete/:userListId', midd, (req, res, next) => {
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