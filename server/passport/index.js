const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/User')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, 'username', (err, user) => {
    if (err) console.log('err', err)
    done(null, user)
  })
})

//  Use Strategies
passport.use(LocalStrategy)

module.exports = passport
