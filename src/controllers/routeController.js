const asyncHandler = require('../middleware/asyncHandler');
const { createCustomError } = require('../utils/CustomError');
const Contact = require('../models/contactModel');

/**
 * @description Get all contacts
 *
 * @route GET /api/v1/contacts
 * @access public
 */
exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    status: 'success',
    data: {
      contacts,
    },
    meta: {
      counts: contacts.length,
    },
  });
});

/**
 * @description Create new contact
 *
 * @route POST /api/v1/contacts
 * @access public
 */
exports.createContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return next(createCustomError('All the fields are required', 400));
  }

  const newContact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json({
    status: 'success',
    message: 'Contact created successfully',
    data: {
      contact: newContact,
    },
  });
});

/**
 * @description Get contact
 *
 * @route GET /api/v1/contacts/:id
 * @access public
 */
exports.getContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Get contact',
  });
});

/**
 * @description Update contact
 *
 * @route PUT /api/v1/contacts/:id
 * @access public
 */
exports.updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Contact updated successfully',
  });
});

/**
 * @description Delete contact
 *
 * @route DELETE /api/v1/contacts/:id
 * @access public
 */
exports.deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Contact deleted successfully',
  });
});
