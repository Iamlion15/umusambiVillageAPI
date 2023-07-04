import visitorModel from "../models/visitorModel"
import adminModel from "../models/adminModel";
import check from "../helpers/adminCheckCredentials";
import generateToken from "../helpers/adminTokenGenerator";
import historyModel from "../models/historyModel";

class adminController {
    static async login(req, res) {
        try {
            const isValid = await check(req.body.username, req.body.password);
            if (isValid) {
                const token = await generateToken(req.body.username);
                res.status(200).json({ "message": "successfully logged in", "token": token });
            }
            else {
                res.status(200).json({ "message": "invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async addvisitor(req, res) {
        const visitor = new visitorModel(req.body);
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
    static async book(req, res) {
        const arrivalTime = Date.now();
        const fees = 3000;
        const visitor = req.body._id;
        try {
            const history = new historyModel({ arrivalTime, fees, visitor })
            const data = await history.save();
            res.status(200).json({ "message": "successfully booked" })
        } catch (error) {
            res.status(400).json(error.message);
        }

    }
    static async findVisitor(req, res) {
        const nid = req.params.id
        const visitor = await visitorModel.findOne({ _id: nid })
        if (visitor == null) {
            res.status(200).json({ "code": "no", "message": "visitor not found" })
        }
        else {
            res.status(200).json({ "code": "yes", "message": visitor })
        }
    }

    static async findOneVisitor(req, res) {
        const visitor = await visitorModel.findOne({ nID: req.body.nID })
        if (visitor == null) {
            res.status(200).json({ "code": "no", "message": "visitor not found" })
        }
        else {
            res.status(200).json({ "code": "yes", "message": visitor })
        }
    }

    static async findBooking(req, res) {
        try {
            const visitors = await historyModel.find().populate('visitor');
            res.status(200).json(visitors)
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    static async updatevisitor(req, res) {
        const visitor = await visitorModel.findOne({ nID: req.body.nID });
        try {
            const data = await visitorModel.findOneAndUpdate(visitor._id, req.body);
            res.status(200).json({ "message": "successfully updated" })
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
    static async deletevisitor(req, res) {
        const visitor = await visitorModel.findOne({ nID: req.body.nID });
        try {
            const data = await visitorModel.findOneAndDelete(visitor._id, req.body);
            res.status(200).json({ "message": "successfully deleted" })
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
    static async getallvisitors(req, res) {
        try {
            const data = await visitorModel.find();
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
    


}

export default adminController;