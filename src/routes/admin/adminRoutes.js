import express from "express";
import adminController from "../../controllers/adminController";
import checkAuth from "../../middlewares/checkAuthentication";
import checkVisitor from "../../middlewares/checkVisitor";

const router=express.Router();

router.post("/addvisitor",checkAuth,checkVisitor,adminController.addvisitor);
router.post("/modifyvisitor",checkAuth,adminController.updatevisitor);
router.delete("/deletevisitor",checkAuth,adminController.deletevisitor);
router.get("/getvisitors",checkAuth,adminController.getallvisitors);
router.post("/login",adminController.login);
router.post("/findvisitor",checkAuth,adminController.findVisitor);
router.post("/book",checkAuth,adminController.book);
router.get("/bookings",checkAuth,adminController.findBooking);

export default router;


