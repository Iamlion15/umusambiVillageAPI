import visitorModel from "../models/visitorModel";
import checkCredentials from "../helpers/UserCheckCredentials";
import UserTokenGenerator from "../helpers/userTokenGenerator";
import historyModel from "../models/historyModel";
import { hashPassword } from "../helpers/hash_match_password";

class visitorController {
    static async login(req, res) {
        try {
	   console.log(req.body)
            const isValid = await checkCredentials(req.body.email, req.body.password);
            if (isValid) {
                const token = await UserTokenGenerator(req.body.email);
                res.status(200).json({ "message": "successfully logged in", "token": token });
            }
            else if(isValid==null)
            {
                res.status(201).json({ "message": "user doesnt exist" });
            }
            else {
                res.status(202).json({ "message": "invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async registerVisitor(req, res) {
        const hpass=await hashPassword(req.body.password);
        const visitor = new visitorModel({...req.body,password:hpass});
        try {
            const data = await visitor.save();
            res.status(200).json({ "message": "successfully saved" })
        }

        catch (error) {
            if (error.code === 11000) {
                res.status(405).json({ "message": "email has been used" });
            }
            else {
                res.status(400).json(error.message);
                console.log(error);
                console.log(error.code);
            }
        }
    }

    static async getDetails(req, res) {

        const visitor = await visitorModel.findOne({ email: req.email });
        try {
            res.status(200).json(visitor)
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }

    static async getHistoryDetails(req, res) {

        const visitor = await visitorModel.findOne({ email: req.email });
        const history=await historyModel.find({visitor:visitor._id});
        try {
            res.status(200).json(history)
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }

}

export default visitorController;