import Produk from "../models/produkModel.js";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

// Menambahkan produk baru
export const tambahProduk = asyncHandler(async (req, res) => {
    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nama, harga, stok } = req.body;

    try {
        const produk = await Produk.create({ nama, harga, stok });
        res.status(201).json({
            status: 'success',
            data: produk
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal menambahkan produk');
    }
});

// Mengupdate produk
export const updateProduk = asyncHandler(async (req, res) => {
    const { nama, harga, stok } = req.body;

    try {
        const produk = await Produk.findById(req.params.id);
        if (!produk) {
            res.status(404);
            throw new Error('Produk tidak ditemukan');
        }

        produk.nama = nama ?? produk.nama;
        produk.harga = harga ?? produk.harga;
        produk.stok = stok ?? produk.stok;

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
        const produk = await Produk.findById(req.params.id);
        if (!produk) {
            res.status(404);
            throw new Error('Produk tidak ditemukan');
        }

        await produk.deleteOne();
        res.status(204).send();
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

export const validateProduk = [
    body('nama').notEmpty().withMessage('Nama produk wajib diisi'),
    body('harga').isNumeric().withMessage('Harga harus berupa angka'),
    body('stok').isInt({ min: 0 }).withMessage('Stok harus berupa angka positif')
];
