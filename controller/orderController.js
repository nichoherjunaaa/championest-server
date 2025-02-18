import Order from "../models/orderModel.js";
import asyncHandler from 'express-async-handler';
import Product from '../models/produkModel.js'
import midtransClient from 'midtrans-client'
import dotenv from 'dotenv'
dotenv.config()

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY
});


export const createOrder = asyncHandler(async (req, res) => {
    const { email, phone, firstname, lastname, cartItem } = req.body;

    if (!cartItem || cartItem.length === 0) {
        res.status(400);
        throw new Error('Keranjang masih kosong !');
    }
    let orderItem = [];
    let orderMidtrans = [];
    let total = 0;
    // console.log(cartItem);

    for (const cart of cartItem) {
        const produkData = await Product.findOne({ _id: cart.product })
        // console.log(produkData);

        if (!produkData) {
            res.status(400)
            throw new Error('Produk tidak tersedia !')
        }
        const { nama, harga, _id, stok } = produkData;
        if (cart.quantity > stok) {
            res.status(404);
            throw new Error(`Stok ${nama} hanya tersisa ${stok} item`)
        }
        const singleProduct = {
            quantity: cart.quantity,
            name : nama,
            price : harga,
            product: _id
        }

        // console.log(singleProduct);

        const shortName = nama.substring(0, 30)
        const singleProductMidtrans = {
            quantity: cart.quantity,
            name: shortName,
            price : harga,
            id: _id
        }
        orderItem = [...orderItem, singleProduct]
        orderMidtrans = [...orderMidtrans, singleProductMidtrans]
        total += cart.quantity * harga
    }

    const order = await Order.create({
        itemsDetail: orderItem,
        total,
        email,
        user: req.user.id,
        phone,
        firstname,
        lastname
    });

    let parameter = {
        "transaction_details": {
            "order_id": order._id,
            "gross_amount": total,
        },
        "item_details": orderMidtrans,
        "customer_details": {
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
            "phone": phone,
        }
    }
    const token = await snap.createTransaction(parameter)

    res.status(201).json({
        total,
        order,
        message: 'Berhasil Order Produk',
        token
    })
});

export const getOrders = asyncHandler(async (req, res) => {
    const allOrders = await Order.find();

    res.status(200).json({
        status: 'success',
        data: allOrders
    })
})

export const detailOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404);
        throw new Error('Pesanan tidak ditemukan');
    }
    res.status(200).json({
        status: 'success',
        data: order
    })
})

export const curentAuthOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user.id })

    res.status(200).json({
        status: 'success',
        data: order
    })
})





