import { Product } from "../models/products.model";

const ProudctService={
    createProduct: async (productData) => {
try {
  const { name, description, price, categoryId, image } = productData;
  // Logic to create a new product in the database
const result = await Product.create({
  name,
  description,
  price,
  category_id: categoryId,
  image
});

return result;


} catch (error) {
  console.log("Internal Server Error During product creation", error.message);
  throw new Error("Failed to create product in Business Logic", error);
}


    },
    getAllProducts: async () => {},
    getProductById: async (id) => {},
    updateProduct: async (id, updateData) => {},
    deleteProduct: async (id) => {},
}


export default ProudctService;