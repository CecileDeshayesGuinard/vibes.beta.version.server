// Profile view get the management of add & remove a contact from a list
// Profile view get the possibility to send userReq with the button contact
// Profile view get the possibility to erase a contact with a click on contact button & automattically erase from a list


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


router.get('/api/profile/:userId', midd, function (req, res, next) { // access to user profile
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

router.put('/api/profile/edit/add/:userListId', midd, function (req, res, next) {

    UserList.put({
      list: req.body.userListId
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

router.put('/api/profile/edit/delete/:userListId', midd, function (req, res, next) {

    UserList.put({
      list: req.body.userListId
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
╦ ╦┌─┐┌─┐┬─┐  ╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗
║ ║└─┐├┤ ├┬┘  ╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║ 
╚═╝└─┘└─┘┴└─  ╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩ 
*/


module.exports = router;