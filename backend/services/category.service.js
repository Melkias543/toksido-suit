import { Category } from "../models/categories.model.js";


const CategoryService = {  
createCategory: async (categoryData) => {
try {
    const result = await Category.create(categoryData);
    return result;
} catch (error) {
    console.log("Internal Server Error During category creation",error.message)
    throw new Error("Internal Server Error During category creation", error);
}
},
getALlCategories: async () => {
try {
    const categories = await Category.find();
    return categories;
} catch (error) {
    console.log("Internal Server Error During fetching categories",error.message)
    throw new Error("Internal Server Error During fetching categories", error);

}
},
getCategoryById: async (id) => {
try {
    const category = await Category.findByPk(id);
    return category;
} catch (error) {
    console.log("Internal Server Error During fetching category by id",error.message)
    throw new Error("Internal Server Error During fetching category by id", error);}},

}

export default CategoryService;