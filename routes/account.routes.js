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


// Not POST for User because edition only


router.get('/account/:userId', function (req, res, next) {
  User.find()
    .then(function (userFromDB) {
      res.json(userFromDB)
    })
    .catch(err => next(err))
})

router.put('/account/:userId', (req, res, next) => {
    const { userId } = req.params;
   
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch(error => res.json(error));
  });


router.get('/account/:userId', (req, res, next) => {
  const { userId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'problem to find the contact' });
    return;
  }
 
  // Each Project document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Project.findById(projectId)
    .populate('tasks')
    .then(project => res.status(200).json(project))
    .catch(error => res.json(error));
});

router.put('/projects/:projectId', (req, res, next) => {
  const { projectId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch(error => res.json(error));
});

router.delete('/projects/:projectId', (req, res, next) => {
  const { projectId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Project.findByIdAndRemove(projectId)
    .then(() => res.status(204).send())
    .catch(error => res.json(error));
});

module.exports = router