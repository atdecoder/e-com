const joiValidation = async (schema, data) => {
    try {
      const value = await schema.validateAsync(data);
      return {
        message: "Success",
        status: true,
        statusCode: 200,
      };
    } catch (err) {
      return {
        message: err.details[0].message.replace(/"/g, ''),
        status: false,
        statusCode: 400,
      };
    }
  };

  module.exports = {
    joiValidation
  };