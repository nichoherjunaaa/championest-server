<<<<<<< HEAD
const userLogin = async (req, res) => {
    res.send('login success');
};

const userRegister = async (req, res) => {
    res.send('register success');
};

const getUser = async (req, res) => {
    res.send('get user success');
};

const getUserById = async (req, res) => {
    res.send('get user by id success');
};



export { userLogin, userRegister, getUser, getUserById };
=======
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '6d'
    });
};

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const isDev = process.env.NODE_ENV === 'development' ? false : true;

    const cookieOptions = {
        expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: isDev
    };

    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: user
    });
};

const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Semua field wajib diisi');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    
    createSendResToken(user, 201, res);
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Email dan password wajib diisi');
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error('Email atau password salah');
    }

    createSendResToken(user, 200, res);
});

const getUser = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
    });
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('User tidak ditemukan');
    }

    res.status(200).json({
        status: 'success',
        data: user
    });
});

const logoutUser = async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires : new Date(Date.now())
    })
    res.status(200).json({ 
        success: true, 
        message: 'Logout Berhasil' 
    })
}

export { userLogin, userRegister, getUser, getUserById, logoutUser };
>>>>>>> origin/VOL-3/auth-controller
