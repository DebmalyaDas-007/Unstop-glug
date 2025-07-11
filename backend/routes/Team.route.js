import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createTeam, deleteTeam, viewAllTeams, viewTeamById } from "../controllers/Team.controller.js";
import { respondToArequest, sendTeamReq, teamsRequested, viewApplications, viewMyteam } from "../controllers/TeamApplication.controller.js";
import { myTeams } from "../controllers/Team.controller.js";
const router=express.Router();

router.route("/:eventId/teams").get(isAuthenticated,viewAllTeams);
router.route("/:eventId/teams/:teamId").get(isAuthenticated,viewTeamById);
router.route("/:eventId/teams/create-team").post(isAuthenticated,createTeam);
router.route("/:eventId/teams/:teamId/delete").delete(isAuthenticated,deleteTeam)
router.route("/teams").get( isAuthenticated, myTeams);
router.route("/:eventId/teams/:teamId/request").post(isAuthenticated,sendTeamReq)
router.route("/:eventId/myteam").get(isAuthenticated,viewMyteam)
router.route("/:eventId/myteam/respond").post(isAuthenticated,respondToArequest)
router.route("/myApplications").get(isAuthenticated,viewApplications)
router.route("/teamsRequested").get(isAuthenticated,teamsRequested)
export default router;