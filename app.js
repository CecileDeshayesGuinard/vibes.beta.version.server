// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// Auth
const isAuthenticated = require('./middleware/jwt.middleware')

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
const fileUploader = require('../server/config/cloudinary.config');

// bcryptjs for password security
const bcrypt = require('bcryptjs');

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const indexRouter = require('./routes/index.routes')
app.use('/api/', indexRouter);

const authRouter = require('./routes/auth.routes')
app.use('/auth', authRouter)

const accountRouter = require('./routes/account.routes')
app.use('/auth', isAuthenticated ,accountRouter)

const profileRouter = require('./routes/profile.routes.js')
app.use('/auth', isAuthenticated ,profileRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
