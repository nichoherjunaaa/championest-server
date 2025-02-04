import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

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
    const isAdmin = (await User.countDocuments()) === 0
    const role = isAdmin ? 'admin' : 'client'

    const createUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role
    })

    createSendResToken(createUser, 201, res)
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Email dan Password harus diisi')
    }

    const userFound = await User.findOne({ email: email })
    if (userFound && (await userFound.comparePassword(password))) {
        createSendResToken(userFound, 200, res)
    } else {
        res.status(400)
        throw new Error('Email atau Password salah')
    }
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
        res.status(200).json({
            data: user
        });
    }
    else {
        res.status(404);
        throw new Error('User tidak ditemukan');
    }
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
        expires: new Date(Date.now())
    })
    res.status(200).json({
        success: true,
        message: 'Logout Berhasil'
    })
}

export { userLogin, userRegister, getUser, getUserById, logoutUser };
