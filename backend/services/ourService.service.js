import { Service } from "../models/service.model.js";

const ToksidoServiceBusinessLogic = {

  // ✅ CREATE
  createService: async (serviceData) => {
    try {
      const { name, description } = serviceData;

      const newService = await Service.create({
        name,
        description
    
      });

      return newService;

    } catch (error) {
      console.error("Error creating service:", error.message);
      throw new Error("Failed to create service");
    }
  },

  // ✅ GET ALL
  getServices: async () => {
    try {
      const services = await Service.find().sort({ createdAt: -1 });
      return services;

    } catch (error) {
      console.error("Error fetching services:", error.message);
      throw new Error("Failed to fetch services");
    }
  },

  // ✅ GET SINGLE
  getServiceById: async (id) => {
    try {
      return await Service.findById(id);

    } catch (error) {
      console.error("Error fetching service:", error.message);
      throw new Error("Failed to fetch service");
    }
  },

  // ✅ UPDATE
  updateService: async (id, updateData) => {
    try {
      return await Service.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
        }
      );

    } catch (error) {
      console.error("Error updating service:", error.message);
      throw error;
    }
  },

  // ✅ DELETE
  deleteService: async (id) => {
    try {
      return await Service.findByIdAndDelete(id);

    } catch (error) {
      console.error("Error deleting service:", error.message);
      throw error;
    }
  },
};

export default ToksidoServiceBusinessLogic;