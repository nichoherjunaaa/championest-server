import express from 'express';
import { protectedMiddleware, isAdminMiddleware } from '../middleware/authMiddleware.js';
import { getProduk, deleteProduk, tambahProduk, updateProduk } from '../controller/produkController.js';
import { validateProduk} from '../controller/produkController.js';
const router = express.Router();

router.post('/', validateProduk, protectedMiddleware, isAdminMiddleware, tambahProduk);
router.get('/', getProduk);
router.put('/:id', validateProduk, protectedMiddleware, isAdminMiddleware, updateProduk);
router.delete('/:id', protectedMiddleware, isAdminMiddleware, deleteProduk);


export default router;