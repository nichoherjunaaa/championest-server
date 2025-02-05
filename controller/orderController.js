import Order from "../models/orderModel.js";
import asyncHandler from 'express-async-handler';

export const createOrder = asyncHandler(async (req, res) => {
    const { email, phone, firstname, lastname, items } = req.body;
    
    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('Pesanan harus memiliki setidaknya satu produk');
    }

    let total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await Order.create({
        itemsDetail: items,
        total,
        email,
        user: req.user.id,
        phone,
        firstname,
        lastname
    });

    res.status(201).json({
        status: 'success',
        data: order
    });
});

export const getOrders = asyncHandler(async(req, res) => {
    const allOrders = await Order.find();

    res.status(200).json({
        status: 'success',
        data: allOrders
    })
})

export const detailOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404);
        throw new Error('Pesanan tidak ditemukan');
    }
    res.status(200).json({
        status:'success',
        data: order
    })
})

export const curentAuthOrder = asyncHandler(async(req, res) => {
    const order = await Order.find({user: req.user.id})

    res.status(200).json({
        status: 'success',
        data: order
    })
})



