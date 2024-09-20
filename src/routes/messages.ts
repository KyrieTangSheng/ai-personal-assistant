import { Router } from 'express';
import { InitiateNewDialogue, ContinueExistingDialoauge } from '../controllers/messages-controller';
const router = Router();

router.post('/messages/new', InitiateNewDialogue);
router.post('/messages/existing',ContinueExistingDialoauge);
export default router;