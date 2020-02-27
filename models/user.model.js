const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:'Full name can\'t be empty.'
    },
    email: {
        type: String,
        required:'Email can\'t be empty.',
        unique: true
    },
    password: {
        type: String,
        required:'Password can\'t be empty.',
        minlength: [8, 'Password must be at least 8 characters.']
    },
    saltSecret: {
        type: String
    }
});

//Validations
userSchema.path('email').validate((val) => {
    emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegex.test(val);
}, 'Invalid email address.');

userSchema.path('fullName').validate((val) => {
    nameRegex = /[A-Za-z\-]+ [A-Za-z\-]+( [A-Za-z\-]+)?/
    return nameRegex.test(val);
}, 'Invalid name.');

//Methods
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJWT = function() {
    return jwt.sign({_id: this.id}, 
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXP
                    });
}

//Events
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);