import express from "express";
import adminController from "../../controllers/adminController";
import checkAuth from "../../middlewares/checkAuthentication";
import checkVisitor from "../../middlewares/checkVisitor";
import visitorAuthController from "../../controllers/visitorAuthenticationController";
import staticsController from "../../controllers/statisticsController";

const router=express.Router();

router.post("/addvisitor",checkAuth,checkVisitor,adminController.addvisitor);
router.post("/modifyvisitor",checkAuth,adminController.updatevisitor);
router.delete("/deletevisitor",checkAuth,adminController.deletevisitor);
router.get("/getvisitors",checkAuth,adminController.getallvisitors);
router.post("/login",adminController.login);
router.get("/findvisitor/:id",checkAuth,adminController.findVisitor);
router.post("/findonevisitor",checkAuth,adminController.findOneVisitor);
router.get("/weeklyvisit",staticsController.computeWeeklyVisitation);
router.get("/dailyvisit",staticsController.computeDailyVisitation);
router.get("/weeklyuser",staticsController.computeWeeklyUsers);
router.get("/history",checkAuth,adminController.findBooking);
router.post("/visitstats",checkAuth,staticsController.getVisitorsInRange)
router.post("/paymentStats",checkAuth,staticsController.getVisitorsTotalPaymentInRange)

export default router;


