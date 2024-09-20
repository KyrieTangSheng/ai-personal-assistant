"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_controller_1 = require("../controllers/messages-controller");
const router = (0, express_1.Router)();
router.post('/messages/new', messages_controller_1.InitiateNewDialogue);
router.post('/messages/existing', messages_controller_1.ContinueExistingDialoauge);
exports.default = router;
