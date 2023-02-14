const express = require('express');
const router = express.Router();

const contactsControllers = require('../controllers/routeController');

router.route('/').get(contactsControllers.getAllContacts);

module.exports = router;
