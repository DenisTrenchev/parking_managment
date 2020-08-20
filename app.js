const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/database');

const home = require('./controllers/home');
const login = require('./controllers/login');
const register = require('./controllers/register');
const dashboard = require('./controllers/dashboard');
//------------------------------------------------------------------------------
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(express.urlencoded({extended: false}));

app.use('/home', home);
app.use('/', home);
app.use('/users/login', login);
app.use('/users/register', register);
app.use('/users/dashboard', dashboard);

//DB test
db.authenticate()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error: ' + err))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


