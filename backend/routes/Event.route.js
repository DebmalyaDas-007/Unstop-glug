import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { deleteEvent, getAdminEvents, getAllEvents, getEventByid, RegisterEvent, sendingCollaborationRequest, UpdateEvent } from "../controllers/Event.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router=express.Router();

router.route("/post").post(isAuthenticated,isAdmin,RegisterEvent);
router.route("/get").get(isAuthenticated,getAllEvents);
router.route("/getAdminEvents").get(isAuthenticated,isAdmin,getAdminEvents);
router.route("/get/:id").get(isAuthenticated,getEventByid);
router.route("/update/:id").put(isAuthenticated,isAdmin,UpdateEvent);
router.route("/delete/:id").delete(isAuthenticated,isAdmin,deleteEvent);

//collabs
router.route("/:id/collaborations").post(isAuthenticated,isAdmin,sendingCollaborationRequest);
export default router;