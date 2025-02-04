import express from 'express';
import { createOrder, curentAuthOrder, detailOrder, getOrders } from '../controller/orderController.js';
import { protectedMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectedMiddleware, createOrder);
router.get('/', getOrders);
router.get('/current', curentAuthOrder);
router.get('/detail', detailOrder)

export default router;