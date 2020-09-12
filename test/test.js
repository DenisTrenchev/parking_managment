const assert = require('chai').assert;
const { addParkingFunc } = require('../controllers/addParking');
//const app = require('../app');
const {register, registerFunc} = require('../controllers/register');
const {registerCar, registerCarFunc} = require('../controllers/registerCar');
const db = require('../models');

after(function (done) {
    db.sequelize.close().then(done);    
});

describe('App', function(){
    it('Failed registration because password length is less then 8.', async function(){
        var res = await registerFunc('asd', 'asd', 'dsa@asd', '123', '123');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.passwordLength, true);
    });

    it('Failed registration because passwords don\'t match.', async function(){
        var res = await registerFunc('asd', 'asd', 'dsa@asd', '123', '321');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.passwordMatch, true);
    });

    it('Failed registration because there are missing field', async function(){
        var res = await registerFunc('asd', 'asd', '', '123', '123');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.allFields, true);
    });
    
    it('Failed registration because the email is already registered.', async function(){
        var res = await registerFunc('asd', 'asd', 'asd@asd', '12345678', '12345678');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.emailExists, true);
    });

    it('Succsessful registration.', async function(){
        var res = await registerFunc('asd', 'asd', 'asd@asdf', '12345678', '12345678');
        assert.equal(res.isValid, true);
        await db.User.destroy({
            where: {email: 'asd@asdf'}
        });
    });
//-------------------------------------------------------------------------------------------------
    it('Failed adding car because a car with this license late already exists', async function(){
        var res = await registerCarFunc('brand1', 'model1', 'asd1234', '2');
        assert.equal(res.isValid, false);
    });

    it('Successful adding of car', async function(){
        var res = await registerCarFunc('brand1', 'model1', 'asd12345asd', '2');
        assert.equal(res.isValid, true);
        await db.Car.destroy({
            where: {licensePlate: 'asd12345asd'}
        });
    });
//-------------------------------------------------------------------------------------------------
    it('Failed adding parking and parking spaces', async function(){
        var res = await addParkingFunc('p1', 'a1', 1);
        assert.equal(res.isValid, false);
    });

    it('Successfuly added parking and parking spaces', async function(){
        var res = await addParkingFunc('p4', 'a4', 3);
        assert.equal(res.isValid, true);
        await db.Parking_Space.destroy({
            where: {parkingID: res.parking.id}
        })
        await db.Parking.destroy({
            where: {name: 'p4'}
        })
    });
});