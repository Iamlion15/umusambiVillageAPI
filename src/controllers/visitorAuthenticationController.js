import visitorModel from "../models/visitorModel";
import sendMail from '../helpers/MailConfig';
import historyModel from "../models/historyModel";


class visitorAuthController {
    constructor() {
        this.securityCode = 0;
    }
    getSecurityCode() {
        return this.securityCode;
    }
    setSecurityCode() {
        this.securityCode = Math.floor(Math.random() * 90000) + 10000;
    }
    static async book_OTP(req, res) {
        const visitor = await visitorModel.findOne({ nID: req.body.nID });
        if (!visitor) {
            res.status(400).json({ "message": "visitor doesnt exist please contact the admin" });
        }
        else {
            const authController = new visitorAuthController();
            authController.setSecurityCode();
            const OTP = authController.getSecurityCode();
            const arrivalTime = Date.now();
            const visitor = req.body._id;
            const fees = 3000;
            req.session.OTP = OTP;
            try {
                const history = new historyModel({ arrivalTime, fees, visitor })
                const data = await history.save();
                try {
                    // await sendMail(visitor.email,OTP);
                    console.log(OTP)
                    res.status(200).json({ "message": "email sent successfully" });
                } catch (error) {
                    res.status(400).json(error.message);
                }
            } catch (error) {
                res.status(400).json(error.message);
                console.log(error);
            }
            
        }
    }

    static async visitorLogin(req, res) {
        const nid = req.body.nID;
        const sentOTP = req.body.otp;
        const OTP = req.session.OTP;
        if (sentOTP == OTP) {
            try {
                const user = await visitorModel.findOne({ nID: nid });
                if (!user) {
                    res.status(401).json({ "message": "user doesn't exist" });
                } else {
                    req.session.user = user._id;
                    delete req.session.OTP;
                    //console.log(req.session.OTP);
                    res.status(200).json({ "message": "authentication successful" })
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ "message": "internal server error" })
            }
        }
        else {
            res.status(401).json({ "message": "invalid OTP" });
        }
    }
}

export default visitorAuthController;