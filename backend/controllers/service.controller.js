import mongoose from "mongoose";
import ToksidoServiceBusinessLogic from "../services/ourService.service.js";

export const ServiceController = {

  // ✅ CREATE SERVICE
  createService: async (req, res) => {
    try {
      const { name, description } = req.body;

      // ✅ Validation
      if (!name || (!name.en && !name.am && !name.or)) {
        return res.status(400).json({
          success: false,
          message: "Name is required in at least one language",
        });
      }

      

      const serviceData = {
        name,
        description,
      };

      const newService = await ToksidoServiceBusinessLogic.createService(serviceData);

      if (!newService) {
        return res.status(400).json({
          success: false,
          message: "Failed to create service",
        });
      }

      res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: newService,
      });

    } catch (error) {
      console.error("Controller Error (createService):", error.message);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to create service",
      });
    }
  },

  // ✅ GET ALL SERVICES
  getServices: async (req, res) => {
    try {
      const services = await ToksidoServiceBusinessLogic.getServices();

      if (!services) {
        return res.status(400).json({
          success: false,
          message: "Failed to fetch service",
        });
      }


      res.status(200).json({
        success: true,
        count: services.length,
        data: services,
      });

    } catch (error) {
      console.error("Controller Error (getServices):", error.message);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch services",
      });
    }
  },

  // ✅ GET SINGLE SERVICE
  getServiceById: async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ ID validation
      if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid service ID",
        });
      }

      const service = await ToksidoServiceBusinessLogic.getServiceById(id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      res.status(200).json({
        success: true,
        data: service,
      });

    } catch (error) {
      console.error("Controller Error (getServiceById):", error.message);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch service",
      });
    }
  },

  // ✅ UPDATE SERVICE
  updateService: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
console.log(id)
      // ✅ ID validation
      if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid service ID",
        });
      }

      // ✅ Build update safely
      const updateData = {};

      if (name) updateData.name = name;
      if (description) updateData.description = description;

      const updatedService = await ToksidoServiceBusinessLogic.updateService(id, updateData);

      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        data: updatedService,
      });

    } catch (error) {
      console.error("Controller Error (updateService):", error.message);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to update service",
      });
    }
  },

  // ✅ DELETE SERVICE
  deleteService: async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ ID validation
      if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid service ID",
        });
      }

      const deletedService = await ToksidoServiceBusinessLogic.deleteService(id);

      if (!deletedService) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Service deleted successfully",
        data: deletedService,
      });

    } catch (error) {
      console.error("Controller Error (deleteService):", error.message);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to delete service",
      });
    }
  },
};