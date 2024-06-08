import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts } from './services/contacts.js';
import { getContactById } from './services/contacts.js';
import mongoose from 'mongoose';
import { env } from './utils/env.js';

const PORT = Number(env(env.PORT, '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World',
    });
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: 'Failed to retrieve contacts',
        err: err.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }

      const contactById = await getContactById(contactId);

      if (!contactById) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact`,
        data: contactById,
      });
    } catch (err) {
      res.status(404).json({
        status: 404,
        message: 'Failed to retrieve contact',
        err: err.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
