const express = require('express')

const {auth: controllers} = require('../../controllers')

const {auth, validation, ctrlWrapper} = require('../../middlewares')
const { joiRegisterSchema, joiLoginSchema} = require('../../models')

const router = express.Router()

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(controllers.signUp))
router.post('/login', validation(joiLoginSchema), ctrlWrapper(controllers.login))
router.get('/logout', auth, ctrlWrapper(controllers.logout))

module.exports = router