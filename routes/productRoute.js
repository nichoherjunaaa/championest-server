import express from 'express';
import { protectedMiddleware } from '../middleware/authMiddleware.js';
import { getProduk, deleteProduk, tambahProduk, updateProduk } from '../controller/produkController.js';
import { validateProduk} from '../controller/produkController.js';
const router = express.Router();

router.post('/', validateProduk, tambahProduk);
router.get('/', getProduk);
router.put('/:id', validateProduk, updateProduk);
router.delete('/:id', deleteProduk);


export default router;