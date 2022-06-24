const {Schema, model} = require('mongoose')
const Joi = require('joi')

const userSchema = Schema({
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
        },
        avatarURL: String,

}, {versionKey: false, timestamps: true})

const joiRegisterSchema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ca', 'org'] } }),
    subscription: Joi.string().valid("starter", "pro", "business")
})

const joiLoginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ca', 'org'] } })
})

const joiSubscribtionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business")
})

const User = model("user", userSchema)

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema,
    joiSubscribtionSchema
}