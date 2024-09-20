import { Router } from 'express';
import { addEvents, getEvents } from '../controllers/events-controller';

const router = Router();

router.post('/events', addEvents);
router.get('/events', getEvents);

export default router;