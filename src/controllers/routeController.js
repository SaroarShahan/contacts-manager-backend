exports.getAllContacts = async (req, res) => {
  res.status(200).json({
    message: 'Get all contacts',
  });
};
