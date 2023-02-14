exports.getAllContacts = async (req, res) => {
  res.status(200).json({
    message: 'Get all contacts',
  });
};

exports.createContact = async (req, res) => {
  res.status(201).json({
    message: 'Contact created successfully',
  });
};

exports.getContact = async (req, res) => {
  res.status(200).json({
    message: 'Get contact',
  });
};

exports.updateContact = async (req, res) => {
  res.status(200).json({
    message: 'Contact updated successfully',
  });
};

exports.deleteContact = async (req, res) => {
  res.status(200).json({
    message: 'Contact deleted successfully',
  });
};
