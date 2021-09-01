//import packages

//import models
const { Report } = require("../models/report")

//import error middleware
const { reportErrors } = require("../error/myError");

//import model schema validation to check correct form of data is coming
const { reportSchema } = require("../validateSchema/reportValidation");

//create report route
exports.createReport = async (req, res, next) => {
    try {

        //validate input data
        const data = await reportSchema.validate({
            ...req.body
        }).catch((err) => {
            throw { status: 422, message: err.errors[0] }
        })

        //create report
        const report = await Report.findOneAndUpdate(
            //condition to check if report exist for given marketID and CmdtyID
            {
                marketID: data.marketID,
                cmdtyID: data.cmdtyID,
            },
            {
                $push: {
                    users: data.userID,
                },
                marketID: data.marketID,
                marketName: data.marketName,
                cmdtyID: data.cmdtyID,
                cmdtyName: data.cmdtyName,
                priceUnit: "Kg"
            },
            //condition to create if report does not exist
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        //calculate mean price
        const totalPrice = (report.priceSum + (data.price / data.convFctr))
        const priceMean = totalPrice / report.users.length 
        report.priceSum = totalPrice
        report.price = priceMean
        
        //save report to update price
        await report.save();

        //console.log(report);
        return res.status(200).json({
            success: true,
            reportID: report._id
        });

    } catch (error) {
        next(error);
    }
};

//get aggreagated reports
exports.getReports = async (req, res, next) => {
    try {

        const data = await Report.findOne({
            _id : req.query.reportID
        }).select("-__v -priceSum")

        if(!data) throw reportErrors.INVALID_REPORTID;

        return res.json({ 
            success: true,
            reports: data
        })
    } catch (error) {
        next(error);
    }
};