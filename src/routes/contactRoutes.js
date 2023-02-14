const express = require('express');
const router = express.Router();

const contactsControllers = require('../controllers/routeController');

router.route('/').get(contactsControllers.getContacts).post(contactsControllers.createContact);

router
  .route('/:id')
  .get(contactsControllers.getContact)
  .put(contactsControllers.updateContact)
  .delete(contactsControllers.deleteContact);

module.exports = router;
