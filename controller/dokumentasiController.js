import Dokumentasi from '../models/dokumentasiModel.js';
import asyncHandler from 'express-async-handler';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary'

export const getDokumentasi = asyncHandler(async (req, res) => {
    const dokumentasi = await Dokumentasi.find();
    res.status(200).json({
        status: 'success',
        data: dokumentasi
    });
});

export const uploadDokumentasi = asyncHandler(async (req, res) => {
    const stream = cloudinary.uploader.upload_stream({
        folder: "docu",
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

export const addDokumentasi = asyncHandler(async (req, res) => {
    const { gambar } = req.body;
    const dokumentasi = new Dokumentasi({
        gambar
    })
    dokumentasi.save()
    res.status(201).json({
        status: 'success',
        data: dokumentasi
    })
})
