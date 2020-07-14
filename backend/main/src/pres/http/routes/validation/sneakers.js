const Joi = require('joi')

module.exports = {
  parse:{
      indexes: Joi.array().items(
        Joi.string().required()
      )
  },
  search: Joi.object().keys({
      brand_id: Joi.string().allow('').optional(),
      model_id: Joi.string().allow('').optional(),
      query: Joi.string().allow('').optional()
  })
}
