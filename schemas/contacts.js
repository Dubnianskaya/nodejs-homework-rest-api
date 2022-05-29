const Joi = require('joi')

const contactsSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ca', 'org'] } }),
    phone: Joi.string().min(10).max(16).required(),
  })

module.exports = contactsSchema