const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find(item => item.id === contactId);
  
  return contactById || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deleteContact;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};