const { hashPassword } = require('../../utils/CustomMethods');
const { authenticate } = require('../../middlewares/auth');
const dal = require('./users.dal');

const  login = async (req, res) => {
    try {
        const response = await authenticate(req, res);
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed"
        };
    }
}

const findAll = async (req, res) => {
    try {
        const response = await dal.findAll(req, res);
        let filteredData;
        filteredData =  response?.data && response.data.map(({ password, ...rest }) => rest);
        response.data =  filteredData;
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed"
        };
    }
}

const findById = async  (req, res) => {
    try {
        const response = await dal.findById(req, res);
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed"
        };
    }
}

const addData = async (req, res) => {
    try {
        const isExist = await dal.findByEmail(req, res);
        if (isExist?.status) {
            return {
                statusCode: 409,
                status: false,
                message: 'Data already exist'
            }
        }
        const password = await hashPassword(req.password);
        req.password = password;
        const response = await dal.addData(req, res);
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

module.exports = {
    findAll,
    findById,
    addData,
    login,
};