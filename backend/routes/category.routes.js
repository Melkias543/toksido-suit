import express from 'express';
import CategoryController from '../controllers/category.controller.js';
const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {
  res.send("Category route");
});
categoryRouter.post('/create', CategoryController.createCategory);
categoryRouter.get('/get/:id', CategoryController.getCategory);
categoryRouter.put('/edit/:id', CategoryController.editCategory);
categoryRouter.delete('/delete/:id', CategoryController.deleteCategory);
categoryRouter.get('/get-all', CategoryController.getAllCategories);

export default categoryRouter;