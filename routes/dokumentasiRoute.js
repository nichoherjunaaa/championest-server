import { getDokumentasi, addDokumentasi, uploadDokumentasi } from "../controller/dokumentasiController.js";
import express from "express";
import { upload } from './../utils/uploadFile.js';
import { protectedMiddleware, isAdminMiddleware } from './../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getDokumentasi);
router.post('/', protectedMiddleware, isAdminMiddleware, upload.single('gambar'), uploadDokumentasi);
router.post('/add', protectedMiddleware, isAdminMiddleware, addDokumentasi);

export default router;
