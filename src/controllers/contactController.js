const asyncHandler = require('../middleware/asyncHandler');
const { createCustomError } = require('../utils/CustomError');
const Contact = require('../models/contactModel');

/**
 * @description Get all contacts
 *
 * @route GET /api/v1/contacts
 * @access private
 */
exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ userId: req.user.id });

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
 * @access private
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
    userId: req.user.id,
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
 * @access private
 */
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById({ _id: req.params.id });

  if (!contact) {
    return next(createCustomError('Contact not found', 404));
  }

  res.status(200).json({
    data: {
      contact,
    },
  });
});

/**
 * @description Update contact
 *
 * @route PUT /api/v1/contacts/:id
 * @access private
 */
exports.updateContact = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;
  const contact = await Contact.findById({ _id });

  if (!contact) {
    return next(createCustomError('Contact not found', 404));
  }

  if (contact.userId.toString() !== req.user.id) {
    return next(createCustomError("You don't have permission to update other user contacts", 401));
  }

  const updateContact = await Contact.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: 'Contact updated successfully',
    data: {
      contact: updateContact,
    },
  });
});

/**
 * @description Delete contact
 *
 * @route DELETE /api/v1/contacts/:id
 * @access private
 */
exports.deleteContact = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const contact = await Contact.findById({ _id });

  if (!contact) {
    return next(createCustomError('Contact not found', 404));
  }

  await Contact.deleteOne({ _id });

  res.status(200).json({
    message: 'Contact deleted successfully',
    data: null,
  });
});
