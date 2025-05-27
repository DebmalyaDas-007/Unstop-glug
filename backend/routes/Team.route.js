import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createTeam, viewAllTeams, viewTeamById } from "../controllers/Team.controller.js";

const router=express.Router();

router.route("/:eventId/teams").get(isAuthenticated,viewAllTeams);
router.route("/:eventId/teams/:teamId").get(isAuthenticated,viewTeamById);
router.route("/:eventId/teams/create-team").post(isAuthenticated,createTeam);



export default router;