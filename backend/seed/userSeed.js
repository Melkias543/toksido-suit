import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config();

console.log("🔥 USER SEED FILE STARTED");

/**
 * We move the users array inside the function or define it 
 * without the role_id initially, because we need to fetch 
 * the ID from the database first.
 */
const userData = {
  username: "admin",
  email: "toksido@admin.com",
  phone: "0918192783",
  password: "Admin@123",
};

export const seedUsers = async () => {
  console.log("🚀 FUNCTION STARTED");

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    console.log("⏳ Connecting to DB...");
    await mongoose.connect(uri);
    console.log("📦 DB CONNECTED");

    // Import models after connection to ensure they register correctly
    const { Role } = await import("../models/role.model.js");
    const { User } = await import("../models/user.model.js");

    const adminRole = await Role.findOne({ name: "admin" });
    
    if (!adminRole) {
      throw new Error("❌ Admin role not found. Please run the Role Seeder first.");
    }

    console.log("🔍 Admin Role Found:", adminRole._id);

    const exists = await User.findOne({ email: userData.email });

    if (!exists) {
      console.log(`🔐 Hashing password for: ${userData.username}...`);
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      await User.create({
        ...userData,
        password: hashedPassword,
        role_id: adminRole._id // Mapping the ID found in DB
      });

      console.log(`✅ Inserted user: ${userData.username}`);
    } else {
      console.log(`⚠️ User already exists: ${userData.email}`);
    }

    console.log("🎉 User seeding process finished successfully");
  } catch (error) {
    console.error("❌ ERROR:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 DISCONNECTED");
    process.exit(0);
  }
};

// 🔥 EXECUTE THE FUNCTION
seedUsers().catch(err => {
  console.error("💥 CRITICAL SYSTEM ERROR:", err);
  process.exit(1);
});