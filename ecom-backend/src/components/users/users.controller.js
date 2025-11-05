const Joi = require('joi');
const service = require('./users.service');
const { joiValidation } = require('../../utils/validation');
const { decodeToken } = require('../../utils/CustomMethods');


const login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email().label("email"),
      password: Joi.string().min(3).max(30).required().label("Password"),
    });
    const validation = await joiValidation(schema, req.body);
    if (!validation.status) {
      return res.status(400).json(validation);
    }
    const response = await service.login(req, res);
    return response;
  } catch (error) {
    return res.status(500).json(error);
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return res.status(200).json({
      statusCode: 200,
      status: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

const findAll = async (req, res) => {
  try {
    const response = await service.findAll(req, res);
    return res.status(response?.statusCode).json(response);
  } catch (error) {

  }
}

const findById = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await service.findById(userId, res);
    return res.status(response?.statusCode).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: error.message
    });
  }
};

const addData = async (req, res) => {
  try {
    const schema = Joi.object({
      password: Joi.string().min(3).max(30).required().label("Password"),
      email: Joi.string().required().email().label("email"),
      createdAt: Joi.string().label("created at")
    });
    const validation = await joiValidation(schema, req.body);
    if (!validation.status) {
      return res.status(400).json(validation);
    }
    const response = await service.addData(req.body, res);
    return res.status(response?.statusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  findById,
  addData,
  findAll,
  login,
  logout
};