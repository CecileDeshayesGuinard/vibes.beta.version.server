const router = require("express").Router();

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

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
