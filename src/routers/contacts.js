import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId', ctrlWrapper(upsertContactController));

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
