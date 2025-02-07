import express from 'express';
import { protectedMiddleware, isAdminMiddleware } from '../middleware/authMiddleware.js';
import { getProduk, deleteProduk, tambahProduk, updateProduk, uploadDataProduct } from '../controller/produkController.js';
import { validateProduk} from '../controller/produkController.js';
import { upload } from '../utils/uploadFile.js';
const router = express.Router();

router.post('/', validateProduk, protectedMiddleware, isAdminMiddleware, tambahProduk);
router.get('/', getProduk);
router.put('/:id', validateProduk, protectedMiddleware, isAdminMiddleware, updateProduk);
router.delete('/:id', protectedMiddleware, isAdminMiddleware, deleteProduk);
router.post('/upload', protectedMiddleware, isAdminMiddleware, upload.single('gambar'), uploadDataProduct);


export default router;