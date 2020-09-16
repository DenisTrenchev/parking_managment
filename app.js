const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const session = require("express-session");
const flash = require("express-flash");

const passport = require("passport");

const db = require('./models');
const initializePassport = require('./config/passport');

const home = require('./controllers/home');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const {register, registerFunc} = require('./controllers/register');
const registerPO = require('./controllers/registerPO');
const dashboard = require('./controllers/dashboard');
const dashboardAdmin = require('./controllers/dashboardAdmin');
const dashboardPO = require('./controllers/dashboardPO');
const viewParking = require('./controllers/viewParking');
const parking = require('./controllers/parking');
const selectParking = require('./controllers/selectParking');
const selectParkingPO = require('./controllers/selectParkingPO');
const {registerCar, registerCarFunc} = require('./controllers/registerCar');
const assignCarToSpace = require('./controllers/assignCarToSpace');
const viewCars = require('./controllers/viewCars'); 
const {addParking, addParkingFunc} = require('./controllers/addParking');
//------------------------------------------------------------------------------
app.set('view engine', 'ejs');

app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: true
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initializePassport(passport);

app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('public'));
app.use('/home', home);
app.use('/', home);
app.use('/users/login', login);
app.use('/users/logout', logout);
app.use('/users/register', register);
app.use('/users/registerPO', registerPO);
app.use('/users/dashboard', dashboard);
app.use('/users/dashboardAdmin', dashboardAdmin);
app.use('/users/dashboardPO', dashboardPO);
app.use('/users/viewParking', viewParking);
app.use('/users/parking', parking);
app.use('/users/selectParking', selectParking);
app.use('/users/selectParkingPO', selectParkingPO);
app.use('/users/registerCar', registerCar);
app.use('/users/assignCarToSpace', assignCarToSpace);
app.use('/users/viewCars', viewCars);
app.use('/users/addParking', addParking);

//DB test
db.sequelize.sync()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error: ' + err))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));