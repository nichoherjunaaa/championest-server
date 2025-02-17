import News from "../models/newsModel.js";
import asyncHandler from 'express-async-handler';

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

export { createNews, getNews, updateNews, deleteNews };