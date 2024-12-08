import express from "express";
import {
  serviceCreate,
  serviceDelete,
  serviceRead,
  serviceUpdate,
} from "../controllers/serviceController.js";
import Authorized from "../middlewares/authorized.js";

const service = express.Router();

service.post("/blog/service/create", Authorized, serviceCreate);
service.get("/blog/service/read", serviceRead);
service.put("/blog/service/update/:id", Authorized, serviceUpdate);
service.delete("/blog/service/delete/:id", Authorized, serviceDelete);

export default service;
