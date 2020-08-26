const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const session = require("express-session");
const flash = require("express-flash");

const bodyParser = require('body-parser');
const path = require('path');
const passport = require("passport");

const db = require('./config/database');
const initializePassport = require('./config/passport');

const home = require('./controllers/home');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const register = require('./controllers/register');
const dashboard = require('./controllers/dashboard');
//------------------------------------------------------------------------------
app.set('view engine', 'ejs');

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false
	})
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initializePassport(passport);

app.use(express.urlencoded({extended: false}));

app.use('/home', home);
app.use('/', home);
app.use('/users/login', login);
app.use('/users/logout', logout);
app.use('/users/register', register);
app.use('/users/dashboard', dashboard);

//DB test
db.authenticate()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error: ' + err))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


