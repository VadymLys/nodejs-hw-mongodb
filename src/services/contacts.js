import { ContactsCollection } from '../db/contact.js';

export const getAllStudents = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.find(contactId);
  return contact;
};
