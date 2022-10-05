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


/*
██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗        ██╗       ██╗  ██╗ ██████╗ ███╗   ███╗███████╗██████╗  █████╗  ██████╗ ███████╗
██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝        ██║       ██║  ██║██╔═══██╗████╗ ████║██╔════╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝
██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗    ████████╗    ███████║██║   ██║██╔████╔██║█████╗  ██████╔╝███████║██║  ███╗█████╗  
██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║    ██╔═██╔═╝    ██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝    ██████║      ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██║     ██║  ██║╚██████╔╝███████╗
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝      ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                                                                                                                                         
*/

/*
╦  ╔═╗╔═╗╔╦╗╦╔╗╔╔═╗
║  ║ ║╠═╣ ║║║║║║║ ╦
╩═╝╚═╝╩ ╩═╩╝╩╝╚╝╚═╝
*/

// loading is the start page if you are a new user of if JWT token is shut down


router.get('/loading', (req, res, next) => {
  res.json('you are on the loading page, please signup or login');
});


/*
╦ ╦╔═╗╔╦╗╔═╗╔═╗╔═╗╔═╗╔═╗
╠═╣║ ║║║║║╣ ╠═╝╠═╣║ ╦║╣ 
╩ ╩╚═╝╩ ╩╚═╝╩  ╩ ╩╚═╝╚═╝
*/


router.get("/homepage", midd, (req, res, next) => { // under midd process because this page is only viewed if you are logged
  res.json("you are on the homepage");
});


module.exports = router;
