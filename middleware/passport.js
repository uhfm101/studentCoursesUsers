const {passport} = require('passport')
const {strategy} = require('passport-local').Strategy
const {User} = require('../models')
const md5 = require('md5')