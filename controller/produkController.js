import Produk from "../models/produkModel.js";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

export const tambahProduk = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nama, deskripsi, harga, stok } = req.body;
    // console.log(req.body);
    try {
        const produk = await Produk.create({
            nama,
            deskripsi,
            harga,
            stok
        });
        res.status(201).json({
            status: 'success',
            data: produk
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal menambahkan produk');
    }
});

export const updateProduk = asyncHandler(async (req, res) => {
    const { nama, harga, stok, gambar, deskripsi } = req.body;

    try {
        const produk = await Produk.findById(req.params.id);
        if (!produk) {
            res.status(404);
            throw new Error('Produk tidak ditemukan');
        }

        produk.nama = nama ?? produk.nama;
        produk.harga = harga ?? produk.harga;
        produk.stok = stok ?? produk.stok;
        produk.gambar = gambar ?? produk.gambar;
        produk.deskripsi = deskripsi ?? produk.deskripsi;

        const updatedProduk = await produk.save();
        res.status(200).json({
            status: 'success',
            data: updatedProduk
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal memperbarui produk');
    }
});

export const deleteProduk = asyncHandler(async (req, res) => {
    try {
        const paramsId = req.params.id
        const product = await Produk.findByIdAndDelete(paramsId)
        if (!product) {
            res.status(404)
            throw new Error('Product not found')
        }
        return res.status(200).json({
            message: 'Produk berhasil dihapus',
            data: product
        })
    } catch (error) {
        res.status(500);
        throw new Error('Gagal menghapus produk');
    }
});

export const getProduk = asyncHandler(async (req, res) => {
    try {
        const produk = await Produk.find();
        res.status(200).json({
            status: 'success',
            data: produk
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal mengambil produk');
    }
});

export const uploadDataProduct = asyncHandler(async (req, res) => {
    const stream = cloudinary.uploader.upload_stream({
        folder: "lomba",
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },    
        function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: 'gagal upload gambar !',
                    error: err
                });
            }
            res.json({
                message: 'Berhasil upload gambar!',
                url: result.secure_url,
            })
        })
    streamifier.createReadStream(req.file.buffer).pipe(stream);
})

export const validateProduk = [
    body('nama').notEmpty().withMessage('Nama produk wajib diisi'),
    body('harga').isNumeric().withMessage('Harga harus berupa angka'),
    body('stok').isInt({ min: 0 }).withMessage('Stok harus berupa angka positif'),
    body('gambar').optional().isURL().withMessage('Gambar harus berupa URL'),
    body('deskripsi').optional().isLength({ min: 5 }).withMessage('Deskripsi produk harus lebih dari 5 karakter')
];
