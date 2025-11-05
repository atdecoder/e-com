const Joi = require('joi');
const service = require('./product.service');
const { joiValidation } = require('../../utils/validation');


const findAll = async (req, res) => {
  try {
    const response = await service.findAll(req, res);
    return res.status(response?.statusCode).json(response);
  } catch (error) {

  }
}

const addData = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required().label("name"),
      price: Joi.number().required().label("price"),
      category: Joi.string().required().label("category"),
      in_stock: Joi.boolean().required().label("in stock"),
      createdAt: Joi.string().label("created at")
    });
    const validation = await joiValidation(schema, req.body);
    if (!validation.status) {
      return res.status(400).json(validation);
    }
    const response = await service.addData(req.body, res);
    return res.status(response?.statusCode).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  addData,
  findAll,
};