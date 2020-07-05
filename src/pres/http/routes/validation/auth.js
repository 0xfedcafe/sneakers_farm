import Joi from 'joi'

export default {
  sign_up: Joi.object().keys({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
  }),
  sign_in: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
  })
}
