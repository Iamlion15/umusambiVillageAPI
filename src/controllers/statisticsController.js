import historyModel from "../models/historyModel";
import mongoose from "mongoose";

class staticsController {
    static async computeWeeklyVisitation(req, res) {
        const myModel = mongoose.model("history")
        const today = new Date()
        //calculate range for current week
        const currentWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

        //calculate range for previous week
        const previousWeekStart = new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
        const previousWeekEnd = new Date(currentWeekEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

        try {
            const currentWeekCount = await myModel.countDocuments({
                createdAt: { $gte: currentWeekStart, $lte: currentWeekEnd }
            });
            const previousWeekCount = await myModel.countDocuments({
                createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd }
            })
            let percentageChange
            if (previousWeekCount === 0) {
                percentageChange = 0
            }
            else {
                percentageChange = ((currentWeekCount - previousWeekCount) / previousWeekCount * 100)
            }

            res.status(200).json({ "currentWeekCount": currentWeekCount, "previousWeekCount": previousWeekCount, "percentage": percentageChange, "currentWeekStart": currentWeekStart, "currentWeekEnd": currentWeekEnd, "previousWeekStart": previousWeekStart, "previousWeekEnd": previousWeekEnd, });
        } catch (error) {
            console.log(error);
            res.status(404).json(error.message);
        }
    }

    static async computeDailyVisitation(req, res) {
        const myModel = mongoose.model("history")
        //calculate range for current day
        const previousDayStart = new Date();
        previousDayStart.setHours(0, 0, 0, 0);
        previousDayStart.setDate(previousDayStart.getDate() - 1);
        const previousDayEnd = new Date();
        previousDayEnd.setHours(23, 59, 59, 999);
        previousDayEnd.setDate(previousDayEnd.getDate() - 1)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 99)
        try {
            const previousDayCount = await myModel.countDocuments({
                createdAt: { $gte: previousDayStart, $lte: previousDayEnd }
            });
            const todayCount = await myModel.countDocuments({
                createdAt: { $gte: todayStart, $lte: todayEnd }
            })
            let percentageChange
            if (previousDayCount === 0) {
                percentageChange = 0
            }
            else {
                percentageChange = ((todayCount - previousDayCount) / previousDayCount * 100)
            }

            res.status(200).json({ " ": todayCount, "previousDayCount": previousDayCount, "percentage": percentageChange, "todayStart": todayStart, "todayEnd": todayEnd, "previousDayStart": previousDayStart, "previousDayEnd": previousDayEnd, });
        } catch (error) {
            console.log(error);
            res.status(404).json(error.message);
        }
    }

    static async computeWeeklyUsers(req, res) {
        const myModel = mongoose.model("visitor")
        const today = new Date()
        //calculate range for current week
        const currentWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

        //calculate range for previous week
        const previousWeekStart = new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
        const previousWeekEnd = new Date(currentWeekEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

        try {
            const currentWeekCount = await myModel.countDocuments({
                createdAt: { $gte: currentWeekStart, $lte: currentWeekEnd }
            });
            const previousWeekCount = await myModel.countDocuments({
                createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd }
            })
            let percentageChange
            if (previousWeekCount === 0) {
                percentageChange = 0
            }
            else {
                percentageChange = ((currentWeekCount - previousWeekCount) / previousWeekCount * 100)
            }

            res.status(200).json({ "currentWeekCount": currentWeekCount, "previousWeekCount": previousWeekCount, "percentage": percentageChange, "currentWeekStart": currentWeekStart, "currentWeekEnd": currentWeekEnd, "previousWeekStart": previousWeekStart, "previousWeekEnd": previousWeekEnd, });
        } catch (error) {
            console.log(error);
            res.status(404).json(error.message);
        }
    }
}

export default staticsController