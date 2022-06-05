const {Schema, model} = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },

}, {versionKey: false, timestamps: true})

const contactsSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ca', 'org'] } }),
    phone: Joi.string().min(10).max(16).required(),
    favorite: Joi.bool()
})

const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required()
})

const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    contactsSchema,
    favoriteJoiSchema
}