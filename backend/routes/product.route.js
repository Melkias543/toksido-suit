import express from "express";
import ProductController from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.js";
import { productSchemaValidator } from "../validator/productValidator.js";
const productRouter = express.Router();
import {upload} from "../utils/ multerConfig.js";
import multer from "multer";
import multerMiddleware from "../middlewares/multer.midlware.js";

// productRouter.get("/", (req, res) => {
//   res.send("Product route");
// });
productRouter.post("/create",multerMiddleware, validate(productSchemaValidator), ProductController.createProduct);
productRouter.get('/products/:id',ProductController.getProductById);
productRouter.put('/:id',multerMiddleware, validate(productSchemaValidator),   ProductController.updateProduct);
productRouter.delete('/:id' ,ProductController.deleteProduct);
productRouter.get("/get-all", ProductController.getAllProducts);

export default productRouter;