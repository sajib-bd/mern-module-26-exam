import express from "express";
import {
  ContactRead,
  ContactCreate,
} from "../controllers/contactController.js";
import Authorized from "../middlewares/authorized.js";

const contact = express.Router();

contact.post("/blog/contact/create", ContactCreate);
contact.get("/blog/contact/read", Authorized, ContactRead);

export default contact;
