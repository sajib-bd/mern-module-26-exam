import express from "express";
import { adminLogin, adminLogout } from "../controllers/adminController.js";

const admin = express.Router();

admin.post("/admin/login", adminLogin);
admin.post("/admin/logout", adminLogout);

export default admin;
