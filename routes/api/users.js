const express = require('express')

const {users: controllers} = require('../../controllers')
const {auth, validation, ctrlWrapper} = require('../../middlewares')
const { joiSubscribtionSchema } = require('../../models')

const router = express.Router()

router.get('/current', auth, ctrlWrapper(controllers.getCurrent))
router.patch('/', auth, validation(joiSubscribtionSchema), ctrlWrapper(controllers.updateSubscribtion))

module.exports = router