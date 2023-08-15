import express from "express";
import checkAuth from "../../middlewares/checkUserAuthentication";
import visitorController from "../../controllers/visitorController";


const router=express.Router();


router.post("/signup",visitorController.registerVisitor);
router.post("/login",visitorController.login);
router.get("/getdetails",checkAuth,visitorController.getDetails);
router.get("/getuserhistory",checkAuth,visitorController.getHistoryDetails);

export default router;
