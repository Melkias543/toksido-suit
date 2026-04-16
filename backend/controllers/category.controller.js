import CategoryService from "../services/category.service.js";
import * as mongo from 'mongodb';


 const CategoryController = {  
createCategory: async(req, res) => {
try {
    const { name } = req.body;
  if (!name.en && !name.am && !name.or) {
  return res.status(400).json({
    message: "At least one language field for category name is required"
  });
}
const category = await CategoryService.createCategory({ name });
if(!category){
  return res.status(400).json({ message: "Failed to create category" });
}

    res.status(201).json({ message: "Category created successfully", category: { category } });
} catch (error) {
    console.log("Internal Server Error During category creation",error.message)
    return res.status(500).json({ message: "Internal Server Error During category creation", error: error.message });
}

},

getCategory: async(req, res) => {
try {
  const { id } = req.params;
  const category = await CategoryService.getCategoryById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ category });
} catch (error) {
  console.log("Internal Server Error During fetching category by id",error.message)
  return res.status(500).json({ message: "Internal Server Error During fetching category by id" });
}
},

// Get all categories
getAllCategories: async(req, res) => {
try {
  const categories = await CategoryService.getALlCategories();
  if (!categories) {
    return res.status(404).json({ message: "No categories found" });
  }
  res.status(200).json({ categories });
} catch (error) {
  console.log("Internal Server Error During fetching categories",error.message)
  return res.status(500).json({ message: "Internal Server Error During fetching categories" });

}


},
editCategory: (req, res) => {
  const { id } = req.params;
  if(!mongo.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid category ID" })

  }
  const { name} = req.body;


},
deleteCategory: (req, res) => {},
  }


export default CategoryController;