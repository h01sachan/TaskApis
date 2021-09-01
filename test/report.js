//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const expect = require("chai").expect;
const request = require("supertest");
const server = require('../index');
const mongoose = require("mongoose");

const { Report } = require("../models/report");

describe("Test Report Apis", () => {
    //before each test clear db 
    beforeEach(async () => {
        await Report.deleteMany({});
    });

    /**
     * Test GET BY REPORT ID by passing reportid in the query
     */

    describe("GET /api/report?reportID=<reportID>", () => {
        it("It should return a report if valid report id is passed", async () => {
            // create sample report
            const report = await Report.create({
                users: [
                    "user-1"
                ],
                priceUnit: "Kg",
                cmdtyID: "cmdty-1",
                marketID: "market-1",
                cmdtyName: "cmdty name -1",
                marketName: "market name -1",
                price: 16, //converted price
                priceSum: 16 //total price of all reports having same cmdtyID-marketID pair (converted price)
            });

            const res = await request(server).get("/api/report?reportID=" + report.id);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success", true);
            expect(res.body).to.have.property("reports");
            expect(res.body.reports).to.have.property("users").that.is.an('array').that.include(report.users[0]);
            expect(res.body.reports).to.have.property("priceUnit", report.priceUnit);
            expect(res.body.reports).to.have.property("cmdtyID", report.cmdtyID);
            expect(res.body.reports).to.have.property("marketID", report.marketID);
            expect(res.body.reports).to.have.property("cmdtyName", report.cmdtyName);
            expect(res.body.reports).to.have.property("marketName", report.marketName);
            expect(res.body.reports).to.have.property("price", report.price);
        });

        it("It should return report not found if valid report id is not passed", async () => {
            // create sample report
            const report = await Report.create({
                users: [
                    "user-1"
                ],
                priceUnit: "Kg",
                cmdtyID: "cmdty-1",
                marketID: "market-1",
                cmdtyName: "cmdty name -1",
                marketName: "market name -1",
                price: 16, //converted price
                priceSum: 16 //total price of all reports having same cmdtyID-marketID pair (converted price)
            });
            const res = await request(server).get("/api/report?reportID=" + "612bcc50e62f1d0016c1e6f7");
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("success", false);
            expect(res.body).to.have.property("message", "Report Not Found");
        });
    });

    /**
     * TEST CREATE REPORT ROUTE
     */

    describe('POST /api/report', () => {
        it("It should only create report when all the request body data is valid", async () => {
            const res = await request(server)
                .post("/api/report")
                .send({
                    userID: "user-1",
                    marketID: "market-1",
                    marketName: "market name -1",
                    marketType: "Potato",
                    cmdtyID: "cmdty-1",
                    cmdtyName: "cmdty name -1",
                    priceUnit: "Quintal",
                    convFctr: 100,
                    price: 1600
                });

            //By Given Algo Calculate mean price
            const totalPrice = (1600 / 100);
            const priceMean = totalPrice / 1;


            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success", true);
            expect(res.body).to.have.property("reportID");

            const report = await Report.findById([res.body.reportID]);

            expect(report).to.have.property("users").that.is.an('array').that.include("user-1");
            expect(report).to.have.property("marketID", "market-1");
            expect(report).to.have.property("marketName", "market name -1");
            expect(report).to.have.property("cmdtyID", "cmdty-1");
            expect(report).to.have.property("priceUnit", "Kg");
            expect(report).to.have.property("price", priceMean);
            expect(report).to.have.property("priceSum", totalPrice);

        })
    });

});