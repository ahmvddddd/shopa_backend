const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    publicKey: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { 
        type: Boolean,
        default: false
     },
    category: { type: String },
    service: { type: String },
    bio: { type: String },
    skills: [{type: String }],
    profileImage: {
      type: Buffer,
    },
}, { timestamps: true });

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('users', userSchema);
module.exports = User;
