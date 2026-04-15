import dotenv from "dotenv";
dotenv.config();

console.log("🔥 FILE STARTED");

// Import mongoose and the model AFTER dotenv
import mongoose from "mongoose";

const seedRoles = async () => {
  console.log("🚀 FUNCTION STARTED");

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    console.log("⏳ Connecting to DB...");
    await mongoose.connect(uri);
    console.log("📦 DB CONNECTED");

    // Dynamic import to prevent model initialization issues
    const { Role } = await import("../models/role.model.js");

    const roles = ["user", "admin"];

    for (const name of roles) {
      const exists = await Role.findOne({ name });
      if (!exists) {
        await Role.create({ name });
        console.log(`✅ INSERTED: ${name}`);
      } else {
        console.log(`⚠️ EXISTS: ${name}`);
      }
    }

    console.log("🎉 DONE");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 DISCONNECTED");
    process.exit(0);
  }
};

// Start the process and catch top-level errors
seedRoles().catch((err) => {
  console.error("💥 CRITICAL ERROR:", err);
  process.exit(1);
});