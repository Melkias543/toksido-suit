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
  const products = await Product.find().populate('category_id').sort({createdAt:-1});
  return products;
} catch (error) {
  console.log("Internal Server Error During fetching all products", error);
  throw new Error("Failed to fetch products in Business Logic", error);
  
}


    },
    getProductById: async (id) => {},


   updateProduct: async (id, updateData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
           {  _id:  id},
            { $set: updateData }, // Using $set ensures only the passed fields are changed
            { 
              runValidators: true // Ensures the update follows your Schema rules
            }
        );

        if (!updatedProduct) {
            throw new Error("Product not found");
        }

        return updatedProduct;
    } catch (error) {
        throw error;
    }},

    deleteProduct: async (id) => {
try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      return deletedProduct
} catch (error) {
  console.error("Error During Deleteing Product",error)
  throw error
}


    },
}


export default ProudctService;