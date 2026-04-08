import { Product } from "../models/products.model.js";

const ProudctService={
    createProduct: async (productData) => {
try {
  const { name, description, price, category_id, image } = productData;
  // Logic to create a new product in the database
const result = await Product.create({
  name,
  description,
  price,
  category_id,
  image
});

return result;


} catch (error) {
  console.log("Internal Server Error During product creation", error);
  throw new Error("Failed to create product in Business Logic", error);
}


    },
getAllProducts: async () => {
try {
  const products = await Product.find().populate('category_id');
  return products;
} catch (error) {
  console.log("Internal Server Error During fetching all products", error.message);
  throw new Error("Failed to fetch products in Business Logic", error);
  
}


    },
    getProductById: async (id) => {},
    updateProduct: async (id, updateData) => {},
    deleteProduct: async (id) => {},
}


export default ProudctService;