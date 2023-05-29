import express from "express";
import adminController from "../../controllers/adminController";
import checkAuth from "../../middlewares/checkAuthentication";

const router=express.Router();

router.post("/addvisitor",checkAuth,adminController.addvisitor);
router.post("/modifyvisitor",checkAuth,adminController.updatevisitor);
router.delete("/deletevisitor",checkAuth,adminController.deletevisitor);
router.get("/getvisitors",checkAuth,adminController.getallvisitors);
router.post("/login",adminController.login);

export default router;


