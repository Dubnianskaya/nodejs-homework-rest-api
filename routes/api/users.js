const express = require('express')

const {users: controllers} = require('../../controllers')
const {auth, validation, upload, ctrlWrapper} = require('../../middlewares')
const { joiSubscribtionSchema, joiReVerifySchema } = require('../../models')

const router = express.Router()

router.get('/current', auth, ctrlWrapper(controllers.getCurrent))
router.patch('/', auth, validation(joiSubscribtionSchema), ctrlWrapper(controllers.updateSubscribtion))
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(controllers.updateAvatar))
router.get("/verify/:verificationToken", ctrlWrapper(controllers.verifyEmail))
router.post("/verify", validation(joiReVerifySchema), ctrlWrapper(controllers.reVerifyEmail))

module.exports = router