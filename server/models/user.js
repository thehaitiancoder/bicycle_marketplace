const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        minlength: 2
    },
    last_name: {
        type: String,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: {
            validator(value) {
                return validator.isEmail(value);
            }
        }
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

UserSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

UserSchema.statics.validatePassword = function(candidatePassword, hashedPassword){
    return bcrypt.compare(candidatePassword, hashedPassword);
};

UserSchema.pre('save', function(next){
    if (!this.isModified('password')) { return next };

    bcrypt.hash(this.password, 10)
        .then(hashed =>{
            this.password = hashed;

            next();
        })
        .catch(next)
});

module.exports = mongoose.model('User', UserSchema);