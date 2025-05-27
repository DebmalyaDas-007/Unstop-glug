import { respondCollaborationReq, viewAllCollaborationReq } from "../controllers/collaborations.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import express from 'express'
const router=express.Router();

router.route("/collaborationRequests").get(isAuthenticated,isAdmin,viewAllCollaborationReq);
router.route("/collaborationRequests/respond").post(isAuthenticated,isAdmin,respondCollaborationReq)
export default router;