const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require("../models/User.model");
const UserReq = require("../models/UserReq.model");
const Event = require("../models/Event.model");
const EventReq = require("../models/EventReq.model");

const fileUploader = require('../config/cloudinary.config');

const midd = require('../middleware/jwt.middleware')


/*
███████╗██╗   ██╗███████╗███╗   ██╗████████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝                                             
*/


/*
╦  ╦╦╔═╗╦ ╦
╚╗╔╝║║╣ ║║║
 ╚╝ ╩╚═╝╚╩╝
*/


router.get('/event', midd, function (req, res, next) { // access to the event

  Event.find()
  .then(function (eventFromDB) {
    res.json(eventFromDB)
  })
  .catch(err => next(err))

})
  
  
router.get('/event/:eventId', midd, (req, res, next) => {

  const { eventId } = req.params; // induction on event side that parameters have same name than in the model

  if (!mongoose.Schema.Types.ObjectId.isValid(eventId)) { // check if event exist
    res.status(400).json({ message: 'problem to find the event' });
    return;
  }

  Event.findById(eventId)
  .populate('user', 'eventReq')
  .then(user => res.status(200).json(user))
  .catch(error => res.json(error));

});



/*
╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗
║╣ ╚╗╔╝║╣ ║║║ ║   ║  ╠╦╝║╣ ╠═╣ ║ ║╣ 
╚═╝ ╚╝ ╚═╝╝╚╝ ╩   ╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝
*/


router.post('/event', fileUploader.single('mainPhoto'), midd, function (req, res, next) {

  const { eventName, maker, startingDay, startingHour, endDay, endHour, streetName, streetNumber, zipCode, cityName, countryName, eventDescription, diffusionList } = req.body;
  
  Event.create(req.params.id, {
    eventPhoto: req.file.path,
    eventName: eventName,
    maker: maker,
    startingDay: startingDay,
    startingHour: startingHour,
    endDay: endDay,
    endHour: endHour,
    streetName: streetName,
    streetNumber: streetNumber,
    zipCode: zipCode,
    cityName: cityName,
    countryName: countryName,
    eventDescription: eventDescription,
    diffusionList: diffusionList
  },
  {new:true})
    .then((eventFromDB)=>{
      res.status(201).json(eventFromDB)
    })
    .catch((err)=>{
      console.log('error creation event',err)
      next(err)
    })
})



/*
╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╔═╗╔╦╗╦╔╦╗
║╣ ╚╗╔╝║╣ ║║║ ║   ║╣  ║║║ ║ 
╚═╝ ╚╝ ╚═╝╝╚╝ ╩   ╚═╝═╩╝╩ ╩ 
*/


router.put('/event/edit/:eventId', midd, (req, res, next) => {

  const { eventId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'event to edit not found' });
    return;
  }
  
  Event.findByIdAndUpdate(eventId, req.body, { new: true })
  .then((updatedEvent) => res.json(updatedEvent))
  .catch(error => res.json(error));
})



/*
╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
║╣ ╚╗╔╝║╣ ║║║ ║    ║║║╣ ║  ║╣  ║ ║╣ 
╚═╝ ╚╝ ╚═╝╝╚╝ ╩   ═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/


router.delete('/event/delete/:eventId', midd, (req, res, next) => {

  const { eventId } = req.params;
  
  if (!mongoose.Schema.Types.ObjectId.isValid(eventId)) { // update to contacts (oter users)
    res.status(400).json({ message: 'problem to find the account' });
    return;
  }  
  Event.findByIdAndRemove(eventId)
  .then(() => res.status(204).send())
  .catch(error => res.json(error));
});



/*
███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██████╗ ███████╗ ██████╗ ██╗   ██╗███████╗███████╗████████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██╔══██╗██╔════╝██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ██████╔╝█████╗  ██║   ██║██║   ██║█████╗  ███████╗   ██║   
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██╔══██╗██╔══╝  ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ██║  ██║███████╗╚██████╔╝╚██████╔╝███████╗███████║   ██║   
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═╝  ╚═╝╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝                                                                                                          
*/


/*
╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗  ╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗
║  ╠╦╝║╣ ╠═╣ ║ ║╣   ╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║ 
╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝  ╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩ 
*/


router.post('/event/create/request', midd, function (req, res, next) {
   
  const event = req.body.eventId;
  const receivers = req.body.userId;

  EventReq.create(req.params.id, {
    event: event,
    receivers: [{receivers}]
  },
  {new:true})
    .then((eventReqFromDB)=>{
      res.status(201).json(eventReqFromDB)
    })
    .catch((err)=>{
    console.log('error creation event request',err)
    next(err)
    })
})



/*
╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗  ╦═╗╔═╗╔═╗╦ ╦╔═╗╔═╗╔╦╗
╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║   ╠╦╝║╣ ╠╣ ║ ║╚═╗║╣  ║║
╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩   ╩╚═╚═╝╚  ╚═╝╚═╝╚═╝═╩╝
*/


router.delete('event/delete/request/:userReqId', midd, (req, res, next) => {

  const { eventReqId } = req.params;
    
  if (!mongoose.Schema.Types.ObjectId.isValid(eventReqId)) {
      res.status(400).json({ message: 'Request erased, you\'re not interrested by this event' });
      return;
  }

  EventReq.findByIdAndRemove(userReqId)
  .then(() => res.status(204).send())
  .catch(error => res.json(error));

});


/*
╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗  ╔═╗╔═╗╔═╗╔═╗╔═╗╔╦╗╔═╗╔╦╗
╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║   ╠═╣║  ║  ║╣ ╠═╝ ║ ║╣  ║║
╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩   ╩ ╩╚═╝╚═╝╚═╝╩   ╩ ╚═╝═╩╝
*/


router.put('/profile/edit/add/:userListId', midd, function (req, res, next) {

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