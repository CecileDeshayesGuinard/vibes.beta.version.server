const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require("../models/User.model");
const UserReq = require("../models/UserReq.model");
const Event = require("../models/Event.model");

const fileUploader = require('../config/cloudinary.config');

/*const midd = require('../middleware/jwt.middleware')*/


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


router.get('/event', function (req, res, next) { // access to the event

  Event.find()
  .then(function (eventFromDB) {
    res.json(eventFromDB)
  })
  .catch(err => next(err))

})
  
  
router.get('/event/:id', (req, res, next) => {

  const { eventId } = req.params; // induction on event side that parameters have same name than in the model

  if (!mongoose.Schema.Types.ObjectId.isValid(eventId)) { // check if event exist
    res.status(400).json({ message: 'problem to find the event' });
    return;
  }

  Event.findById(eventId)
  .populate('user')
  .then(user => res.status(200).json(user))
  .catch(error => res.json(error));

});



/*
╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗
║╣ ╚╗╔╝║╣ ║║║ ║   ║  ╠╦╝║╣ ╠═╣ ║ ║╣ 
╚═╝ ╚╝ ╚═╝╝╚╝ ╩   ╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝
*/


router.post('/event', fileUploader.single('mainPhoto'), function (req, res, next) {

  const { name, maker, startAt, endAt, streetName, streetNumber, zipCode, cityName, countryName, eventDescription, diffusionList } = req.body;
  
  const newEvent = new Event ({
    /*eventPhoto: req.file.path,*/
    name: name,
    maker: maker,
    startAt: startAt,
    endAt: endAt,
    location: {
      streetName: streetName,
      streetNumber: streetNumber,
      zipCode: zipCode,
      cityName: cityName,
      countryName: countryName
    },
    eventDescription: eventDescription,
    diffusionList: diffusionList
  })

  newEvent.save()
  .then((newEvent)=>{
    res.status(201).json(newEvent)
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


router.put('/event/:id', (req, res, next) => {

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


router.delete('/event/:id', (req, res, next) => {

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
╦═╗╔═╗╔═╗ ╦ ╦╔═╗╔═╗╔╦╗  ╔═╗╔═╗╔═╗╔═╗╔═╗╔╦╗╔═╗╔╦╗
╠╦╝║╣ ║═╬╗║ ║║╣ ╚═╗ ║   ╠═╣║  ║  ║╣ ╠═╝ ║ ║╣  ║║
╩╚═╚═╝╚═╝╚╚═╝╚═╝╚═╝ ╩   ╩ ╩╚═╝╚═╝╚═╝╩   ╩ ╚═╝═╩╝
*/


router.put('/events/:id/confirm', function (req, res, next) {

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