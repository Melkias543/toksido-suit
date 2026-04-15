import express from "express";
import { ServiceController } from "../controllers/service.controller.js";

const serviceRoute = express.Router();

// ✅ CREATE
serviceRoute.post("/create", ServiceController.createService);

// ✅ GET ALL
serviceRoute.get("/get-all", ServiceController.getServices);

// ✅ GET SINGLE
serviceRoute.get("/:id", ServiceController.getServiceById);

// ✅ UPDATE
serviceRoute.put("/:id", ServiceController.updateService);

// ✅ DELETE
serviceRoute.delete("/:id", ServiceController.deleteService);

export default serviceRoute;