import express from "express";
import ProductController from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.js";
import { productSchemaValidator } from "../validator/productValidator.js";
const router = express.Router();
import upload from "../utils/ multerConfig.js";

router.get("/", (req, res) => {
  res.send("Product route");
});
router.post('/products', upload.single("image"), (req, res, next) => {
    // Attach the uploaded filename to req.body.image for Joi validation
    if (req.file) req.body.image = req.file.filename;
    next();
  },validate(productSchemaValidator),  ProductController.createProduct);
router.get('/products/:id',ProductController.getProductById);
router.put('/products/:id',ProductController.updateProduct);
router.delete('/products/:id',ProductController.deleteProduct);

export default router;