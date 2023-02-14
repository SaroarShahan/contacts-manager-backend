const express = require('express');
const router = express.Router();

const contactsControllers = require('../controllers/routeControllers');

router.route('/').get(contactsControllers.getAllContacts);

module.exports = router;
