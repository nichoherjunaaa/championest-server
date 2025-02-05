import express from 'express';
import { createOrder, curentAuthOrder, detailOrder, getOrders } from '../controller/orderController.js';
import { protectedMiddleware, isAdminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectedMiddleware, createOrder);
router.get('/', protectedMiddleware, isAdminMiddleware, getOrders);
router.get('/current', protectedMiddleware, curentAuthOrder);
router.get('/detail/:id', protectedMiddleware, detailOrder)

export default router;