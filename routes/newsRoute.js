import express from 'express';
import { createNews, getNews, updateNews, deleteNews, uploadNews } from '../controller/newsController.js';
import { upload } from '../utils/uploadFile.js';
import { protectedMiddleware, isAdminMiddleware } from './../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', createNews);
router.get('/', getNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);
router.post('/upload', protectedMiddleware, isAdminMiddleware, upload.single('gambar'), uploadNews);

export default router;