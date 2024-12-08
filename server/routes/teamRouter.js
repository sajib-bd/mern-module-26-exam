import express from "express";
import {
  teamCreate,
  teamDelete,
  teamRead,
  teamUpdate,
} from "../controllers/teamController.js";
import Authorized from "../middlewares/authorized.js";

const team = express.Router();

team.post("/blog/team/create", Authorized, teamCreate);
team.get("/blog/team/read", teamRead);
team.put("/blog/team/update/:id", Authorized, teamUpdate);
team.delete("/blog/team/delete/:id", Authorized, teamDelete);

export default team;
