import mongoose from 'mongoose';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contacts',
      err: err.message,
    });
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(404).json({
        status: 404,
        message: 'Not found',
      });
    }
    const contact = await getContactById(contactId);

    if (!contact) {
      next(createHttpError(404, 'Student not found'));
    }

    res.json({
      status: 200,
      message: `Successfully found student with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: 'Failed to retrieve contact',
      err: err.message,
    });
  }
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404), 'Student not found');
    return;
  }
  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Student not found'));
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
