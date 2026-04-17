import express from 'express'
import { authMiddleware } from '../middlewares/auth.midlware.js';
import SuitStatusController from '../controllers/suitStatus.controller.js';

const rateRoute= express.Router()

rateRoute.patch('/:id', authMiddleware,SuitStatusController.createSuitReview );

export default rateRoute