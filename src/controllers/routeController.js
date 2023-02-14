const asyncHandler = require('../middleware/asyncHandler');
const { createCustomError } = require('../utils/CustomError');

/**
 * @description Get all contacts
 *
 * @route GET /api/v1/contacts
 * @access public
 */
exports.getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Get all contacts',
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

  res.status(201).json({
    message: 'Contact created successfully',
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
