import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { deleteEvent, getAdminEvents, getAllEvents, getEventByid, RegisterEvent, UpdateEvent } from "../controllers/Event.controller.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,RegisterEvent);
router.route("/get").get(isAuthenticated,getAllEvents);
router.route("/getAdminEvents").get(isAuthenticated,getAdminEvents);
router.route("/get/:id").get(isAuthenticated,getEventByid);
router.route("/update/:id").put(isAuthenticated,UpdateEvent);
router.route("/delete/:id").delete(isAuthenticated,deleteEvent);

export default router;