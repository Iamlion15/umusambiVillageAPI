import express from "express";
import authController from "../../controllers/visitorAuthenticationController";
import checkAuth from "../../middlewares/checkAuthentication";
const router=express.Router();
import session from 'express-session';
router.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000 
      }
  }));

router.post("/book",checkAuth,authController.book_OTP);
router.post("/login",authController.visitorLogin);

export default router;
