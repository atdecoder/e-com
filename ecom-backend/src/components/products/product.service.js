const dal = require('./product.dal');

const findAll = async (req, res) => {
    try {
        const response = await dal.findAll(req, res);
        return response;
    } catch (error) {
        console.log("error", error);

        return {
            statusCode: 500,
            status: false,
            message: "Failed"
        };
    }
}

const addData = async (req, res) => {
    try {
        const response = await dal.addData(req, res);
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed"
        };
    }
}

module.exports = {
    findAll,
    addData,
};