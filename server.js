require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const apiRoutes = require('./controllers/api');
const bcrypt = require('bcrypt');
const fs = require('fs');  // Include the 'fs' module
const helpers = require('./utils/helpers'); 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const logoutRoute = require('./controllers/api/user-routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Create an instance of express-handlebars
const hbs = exphbs.create({
  defaultLayout: 'main', // Specifies the default layout file (main.handlebars)
  layoutsDir: path.join(__dirname, 'views/layouts'), // Specifies the layouts directory
  partialsDir: path.join(__dirname, 'views/partials'), // Specifies the partials directory
  helpers: helpers
});

// Configured and linked session object with the sequelize store
const sess = {
  secret: bcrypt.hashSync(process.env.SESSION_SECRET, 10),
  cookie: {
    maxAge: 15 * 60 * 1000  // 15 minute time-out feature
  },
  resave: false,
  saveUninitialized: true,
  rolling: true,  // Reset the session expiry time on each request
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Express.js middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use('/api', apiRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


// Sets the view engine to use Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Sets the views directory

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
