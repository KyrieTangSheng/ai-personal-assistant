"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dialogues_contoller_1 = require("../controllers/dialogues-contoller");
const router = (0, express_1.Router)();
router.get('/dialogues', dialogues_contoller_1.GetDialogueList);
router.get(`/dialogues/:dialogueId`, dialogues_contoller_1.GetMessageHistory);
exports.default = router;
