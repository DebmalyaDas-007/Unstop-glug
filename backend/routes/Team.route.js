import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createTeam, deleteTeam, viewAllTeams, viewTeamById } from "../controllers/Team.controller.js";

const router=express.Router();

router.route("/:eventId/teams").get(isAuthenticated,viewAllTeams);
router.route("/:eventId/teams/:teamId").get(isAuthenticated,viewTeamById);
router.route("/:eventId/teams/create-team").post(isAuthenticated,createTeam);
router.route("/:eventId/teams/:teamId/delete").delete(isAuthenticated,deleteTeam)


export default router;