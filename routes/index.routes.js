const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
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


/*router.get('/loading', (req, res, next) => {
  res.json('you are on the loading page, please signup or login');
});*/


/*
╦ ╦╔═╗╔╦╗╔═╗╔═╗╔═╗╔═╗╔═╗
╠═╣║ ║║║║║╣ ╠═╝╠═╣║ ╦║╣ 
╩ ╩╚═╝╩ ╩╚═╝╩  ╩ ╩╚═╝╚═╝
*/

// ICI tu definis une route /api/quelquechose => donc qd tu fais appel a /api/users : users est assimile a quelquechose
// maintennat que tu as bien suppr cette route, ce n'est plus le cas

/*router.get("/:id", (req, res, next) => { // under midd process because this page is only viewed if you are logged
  res.json("you are on the homepage");
});*/



module.exports = router;