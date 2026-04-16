import express from "express";
import { ServiceController } from "../controllers/service.controller.js";
import { authMiddleware, authorize } from "../middlewares/auth.midlware.js";

const serviceRoute = express.Router();

// ✅ CREATE
serviceRoute.post("/create",authMiddleware , authorize('admin'), ServiceController.createService);


// ✅ UPDATE
serviceRoute.put("/:id", authMiddleware , authorize('admin'),ServiceController.updateService);

// ✅ DELETE
serviceRoute.delete("/:id",authMiddleware , authorize('admin'), ServiceController.deleteService);
// ✅ GET ALL
serviceRoute.get("/get-all", ServiceController.getServices);

// ✅ GET SINGLE
serviceRoute.get("/:id", ServiceController.getServiceById);

export default serviceRoute;