const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);
  if(!contactById) {
      return null;
  }
  return contactById;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if(idx === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
    const newContact = {id: v4(), ...body};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if(contactIndex === -1) {
    return null
  }
  contacts[contactIndex] = {id:contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[contactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
