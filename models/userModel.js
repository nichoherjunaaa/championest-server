import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

var userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username harus diisi'],
    },
    email : {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: [true, 'Email sudah terdaftar'],
        validate : {
            validator : validator.isEmail,
            message : 'Format email tidak valid'
        }
    },
    password : {
        type: String,
        required: [true, 'Password harus diisi'],
        minLength: [8, 'Password minimal 6 karakter'],
    },
    role : {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    },
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};  

const User = mongoose.model('User', userSchema);

export default User;