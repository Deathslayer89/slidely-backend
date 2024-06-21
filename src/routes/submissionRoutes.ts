import { Router } from 'express';
import { submitForm, readForm, deleteSubmission, searchSubmission, ping, updateSubmission } from '../controllers/submissionController';

const router = Router();

router.post('/submit', submitForm);
router.get('/read', readForm);
router.delete('/delete/:email',deleteSubmission)
router.get('/search',searchSubmission)
router.get('/ping',ping)
router.put('/update/:email',updateSubmission)
export default router;
