const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers/");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite } = req.query;
  if (favorite) {
    const result = await Contact.find(
      { owner, favorite },
      "-createAt -updateAt"
    );
    return res.json(result);
  }

  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createAt -updateAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).exec();

  if (req.user._id.toString() !== result.owner.toString()) {
    throw HttpError(403, "Forbidden");
  }

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).exec();
  if (req.user._id.toString() !== contact.owner.toString()) {
    throw HttpError(403, "Forbidden");
  }
  const result = await Contact.findByIdAndDelete({ _id: contactId });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).exec();
  if (req.user._id.toString() !== contact.owner.toString()) {
    throw HttpError(403, "Forbidden");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
