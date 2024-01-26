const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 8,
        maxlength: 20,
        match: /^[a-zA-Z0-9]+$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
    },
    name: {
        type: String,
        required: false,
    },
    dietaryRestrictions: {
        type: [String],
        default: []
    },
    membershipLevel: {
        type: String,
        default: 'Basic',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'User',
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const dbUser = mongoose.model('user', userSchema);

module.exports = dbUser;

