import { Router } from "express";
import { GetDialogueList, GetMessageHistory } from "../controllers/dialogues-contoller";

const router = Router();

router.get('/dialogues', GetDialogueList);
router.get(`/dialogues/:dialogueId`,GetMessageHistory)
export default router;