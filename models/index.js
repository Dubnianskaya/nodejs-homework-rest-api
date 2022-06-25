const {Contact, contactsSchema, favoriteJoiSchema} = require('./contact')
const { User, joiRegisterSchema, joiLoginSchema, joiSubscribtionSchema, joiReVerifySchema} = require('./user')

module.exports = {
    Contact,
    contactsSchema,
    favoriteJoiSchema,
    User,
    joiRegisterSchema,
    joiLoginSchema,
    joiSubscribtionSchema,
    joiReVerifySchema
}