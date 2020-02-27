const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(!err) {res.send(doc);}
        else {console.log(err);}
    });
}

module.exports.authenticate = (req, res, next) => {
    //call for authentication
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJWT()});
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.profile = (req, res, next) => {
    User.findOne({_id: req._id}, (err, user) =>{
        if(!user)
            return res.status(404).json({status: false, message: 'User not found'});
        else
            return res.status(200).json({status: true, user: _.pick(user, ['fullName', 'email'])})    
    });
}