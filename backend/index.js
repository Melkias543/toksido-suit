import express from 'express';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.routes.js';
import serviceRoute from './routes/service.routes.js';
import authRoutes from './routes/auth.routes.js';
import rateRoute from './routes/suit.status.route.js';
const router = express.Router();
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/service', serviceRoute);

router.use('/auth',authRoutes)

router.use('/rate-suit',  rateRoute)

export default router;