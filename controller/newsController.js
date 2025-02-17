import News from "../models/newsModel.js";
import asyncHandler from 'express-async-handler';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';

const createNews = asyncHandler(async (req, res) => {
    const { nama, deskripsi } = req.body;
    try {
        const news = await News.create({
            nama,
            deskripsi
        });
        res.status(201).json({
            status: 'success',
            data: news
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal menambahkan news');
    }
});

const getNews = asyncHandler(async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json({
            status: 'success',
            data: news
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal menampilkan news');
    }
});

const updateNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi, gambar } = req.body;
    try {
        const news = await News.findById(id);
        if (!news) {
            res.status(404);
            throw new Error('Berita tidak ditemukan');
        }

        news.nama = nama ?? news.nama;
        news.deskripsi = deskripsi ?? news.deskripsi;
        news.gambar = gambar ?? news.gambar;

        const updatedNews = await news.save();
        res.status(200).json({
            status: 'success',
            data: updatedNews
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal memperbarui berita');
    }
});

const deleteNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            res.status(404);
            throw new Error('Berita tidak ditemukan');
        }
        res.status(200).json({
            status: 'success',
            data: news
        });
    } catch (error) {
        res.status(500);
        throw new Error('Gagal menghapus berita');
    }
});

const uploadNews = asyncHandler(async (req, res) => {
    const stream = cloudinary.uploader.upload_stream({
        folder: "news",
        allowed_formats: ['jpg', 'png', 'jpeg'],
    }, function (err, result) {
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
});


export { createNews, getNews, updateNews, deleteNews, uploadNews };