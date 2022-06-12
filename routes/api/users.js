const express = require('express')

const {users: controllers} = require('../../controllers')
const {auth, validation, upload, ctrlWrapper} = require('../../middlewares')
const { joiSubscribtionSchema } = require('../../models')

const router = express.Router()

router.get('/current', auth, ctrlWrapper(controllers.getCurrent))
router.patch('/', auth, validation(joiSubscribtionSchema), ctrlWrapper(controllers.updateSubscribtion))
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(controllers.updateAvatar))

module.exports = router