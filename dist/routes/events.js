"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events-controller");
const router = (0, express_1.Router)();
router.post('/events', events_controller_1.addEvents);
router.get('/events', events_controller_1.getEvents);
exports.default = router;
