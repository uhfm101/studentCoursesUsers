const {passport} = require('passport')
const {Strategy} = require('passport-local').Strategy
const {User} = require('../models')
const md5 = require('md5')

async function validateUser(username, password, done){
    const user = await User.findOne({
        where: {
            email: username,
            password: md5(password)
        }
    })
    if (!user){
        return done(null, false, {message: 'Invalid username or password'})
    }
    return done(null, {id: user.id})
}

passport.use(
    new Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, validateUser
    )
)

passport.serializeUser(function(user, done){
    process.nexTick(function(){
        done(null, {
            id:user.id
        })
    })
})

passport.deserializeUser(async function(user, done){
    const userModel = await User.findByPk(user.id, {
        include: ['staff', 'student']
    })
    process.nextTick(function(){
        return done(null, userModel)
    })
})



module.exports.passport = passport