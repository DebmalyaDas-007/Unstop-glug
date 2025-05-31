import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createTeam, deleteTeam, viewAllTeams, viewTeamById } from "../controllers/Team.controller.js";
import { respondToArequest, sendTeamReq, viewMyteam } from "../controllers/TeamApplication.controller.js";

const router=express.Router();

router.route("/:eventId/teams").get(isAuthenticated,viewAllTeams);
router.route("/:eventId/teams/:teamId").get(isAuthenticated,viewTeamById);
router.route("/:eventId/teams/create-team").post(isAuthenticated,createTeam);
router.route("/:eventId/teams/:teamId/delete").delete(isAuthenticated,deleteTeam)

//from team applications
router.route("/:eventId/teams/:teamId/request").post(isAuthenticated,sendTeamReq)
router.route("/:eventId/myteam").get(isAuthenticated,viewMyteam)
router.route("/:eventId/myteam/respond").post(isAuthenticated,respondToArequest)
export default router;