"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_controller_1 = require("../controllers/chatbot-controller");
const router = (0, express_1.Router)();
router.get('/chatbot/daily-plan', chatbot_controller_1.getDailyPlan);
exports.default = router;
