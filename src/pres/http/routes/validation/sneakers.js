import Joi from 'joi'

export default {
  parse:{
      indexes: Joi.array().items(
        Joi.string().required()
      )
  },
  search: Joi.object().keys({
      brand_id: Joi.string().allow('').optional(),
      set_id: Joi.string().allow('').optional(),
      query: Joi.string().allow('').optional()
  })
}
