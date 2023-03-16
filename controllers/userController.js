const {User, Student} = require('../models')
const md5 = require('md5')
const passport = require('passport')
const {User, Student, Staff} = require('../models')

module.exports.renderStudentRegistrationForm = function(req, res){
    res.render('user/register')
}

module.exports.registerStudent = async function(req, res){
    const user = await User.create({
        email: req.body.email,
        password:md5(req.body.password),
        role: 'student'
    })
    await Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        grade_level: req.body.grade_level,
        user_id: user.id
    })
    res.redirect('/courses')
}

module.exports.renderLoginForm = function(req, res){
    let errorMessages = [];
    if (req.session.messages){
        errorMessages  = req.session.messages
    }
    res.render('user/login', {errorMessages})
}

module.exports.login = passport.authenticate('local', {
    successRedirect: '/courses',
    failureRedirect: '/login',
    failureMessage: true
})

module.exports.renderStudentRegistrationForm =function(req, res){
    res.render('user/registerStudent')
}

module.exports.renderStaffRegistrationForm =function(req, res){
    res.render('user/registerStaff')
}

module.exports.registerStaff =async function(req, res){
    const user = await User.create({
        email: req.body.email,
        password:md5(req.body.password),
        role: 'staff'
    })
    await Staff.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_id: user.id
    })
    res.redirect('/courses')
}

module.exports.logout = function (req, res){
    req.logout();
    res.redirect('/login')
}