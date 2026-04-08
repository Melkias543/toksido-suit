import express from 'express';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.routes.js';
const router = express.Router();
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
export default router;