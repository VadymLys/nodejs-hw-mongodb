import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllStudents } from './services/contacts.js';
import { getContactById } from './services/contacts.js';
import mongoose from 'mongoose';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

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
      const students = await getAllStudents();
      res.status(200).json({
        status: 'success',
        message: 'Successfully found contacts!',
        data: students,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve contacts',
        err: err.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contactById = await getContactById(contactId);

      if (!contactById) {
        return res.status(404).json({
          status: 'error',
          message: 'Not found',
        });
      }

      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(404).json({
          status: 'error',
          message: 'Not found',
        });
      }

      res.status(200).json({
        status: 'success',
        message: `Successfully found contact with id! ${contactById}`,
        data: contactById,
      });
    } catch (err) {
      res.status(404).json({
        status: 'error',
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
