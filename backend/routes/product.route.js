import express from "express";
import ProductController from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.js";
import { productSchemaValidator } from "../validator/productValidator.js";
const productRouter = express.Router();
import {upload} from "../utils/ multerConfig.js";
import multer from "multer";
import multerMiddleware from "../middlewares/multer.midlware.js";
import { authMiddleware, authorize } from "../middlewares/auth.midlware.js";

// productRouter.get("/", (req, res) => {
//   res.send("Product route");
// });

// ADMIN PAGE ONLY
productRouter.post("/create" ,authMiddleware , authorize('admin'),multerMiddleware, validate(productSchemaValidator), ProductController.createProduct);
productRouter.put('/:id',authMiddleware , authorize('admin'),multerMiddleware, validate(productSchemaValidator),   ProductController.updateProduct);
productRouter.delete('/:id',authMiddleware , authorize('admin'),ProductController.deleteProduct);



productRouter.get('/products/:id',ProductController.getProductById);
productRouter.get("/get-all", ProductController.getAllProducts);

export default productRouter;