const {Contact} = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers/");

const getAll = async (_, res) => {
  const result = await Contact.find();
  console.log(result)
  res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    console.log(contactId)
    const result = await Contact.findById(contactId).exec();
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete({_id: contactId});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate({_id: contactId}, req.body, {new: true})
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),

};
