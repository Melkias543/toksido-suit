import ProudctService from "../services/product.service";

const productController = {
    createProduct: async(req, res) => {
try {
const {image,price,description,name } = req.body;


const result = await ProudctService.createProduct({
  image,
  price,
  description,
  name
});
if(!result){
  return res.status(400).json({ message: "Failed to create product" });}


return res.status(201).json({ message: "Product created successfully", product: result });
  
} catch (error) {
  console.log("Internal Server Erorr During product creation",error.message)
  return res.status(500).json({ message: "Internal Server Error During product creation", error: error.message });
}

  },
  getAllProducts: async(req, res) => {
    // Logic to fetch all products from the database
    res.json({ message: "All products fetched successfully" });
  },
  getProductById: async(req, res) => {
    const { id } = req.params;
    // Logic to fetch a product by its ID from the database
    res.json({ message: `Product with ID ${id} fetched successfully` });
  },

  updateProduct: async(req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    // Logic to update an existing product in the database
    res.json({ message: `Product        with ID ${id} updated successfully`, product: { name, price } });
  },
  deleteProduct: async(req, res) => {
    const { id } = req.params;
    // Logic to delete a product from the database
    res.json({ message: `Product with ID ${id} deleted successfully` });
  }
};

export default productController;