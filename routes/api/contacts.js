const express = require('express')

const {contacts: controllers} = require('../../controllers')

const {auth, validation, ctrlWrapper} = require('../../middlewares')
const {contactsSchema, favoriteJoiSchema} = require('../../models')
const validateMiddlewars = validation(contactsSchema)

const router = express.Router()

router.get('/', auth, ctrlWrapper(controllers.getAll))

router.get('/:contactId', ctrlWrapper(controllers.getById))

router.post('/', auth, validateMiddlewars, ctrlWrapper(controllers.add))

router.delete('/:contactId', ctrlWrapper(controllers.removeById))

router.put('/:contactId', validateMiddlewars, ctrlWrapper(controllers.updateById))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(controllers.updateFavorite))

module.exports = router
