const yup = require("yup");

//report schema
const reportSchema = yup.object({
    userID: yup.string().required("userID is required"),
    marketID: yup.string().required("marketID is required"),
    marketName: yup.string().required("marketName is required"),
    marketType: yup.string().required("marketType is required"),
    cmdtyID: yup.string().required("cmdtyID is required"),
    cmdtyName: yup.string().required("cmdtyName is required"),
    priceUnit: yup.string().required("priceUnit is required"),
    convFctr: yup.number().required("convFctr is required"),
    price: yup.number().required("price is required")
});

module.exports = {
    reportSchema
}