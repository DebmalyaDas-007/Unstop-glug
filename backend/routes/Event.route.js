import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { deleteEvent, getAdminEvents, getAllEvents, getByCategory, getEventByid, RegisterEvent, sendingCollaborationRequest, UpdateEvent } from "../controllers/Event.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { upload } from "../middlewares/multer.js";
const router=express.Router();

router.route("/post").post(isAuthenticated,isAdmin,upload.single('image'),RegisterEvent);
router.route("/get").get(getAllEvents);
router.route("/getAdminEvents").get(isAuthenticated,isAdmin,getAdminEvents);
router.route("/get/:id").get(getEventByid);
router.route("/update/:id").put(isAuthenticated,isAdmin,UpdateEvent);
router.route("/delete/:id").delete(isAuthenticated,isAdmin,deleteEvent);
router.route("/:category").get(getByCategory)

//collabs
router.route("/:id/collaborations").post(isAuthenticated,isAdmin,sendingCollaborationRequest);
export default router;