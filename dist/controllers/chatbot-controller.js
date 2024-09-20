"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyPlan = void 0;
const generative_ai_1 = require("@google/generative-ai");
const googleGenAi = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const googleModel = googleGenAi.getGenerativeModel({ model: process.env.GOOGLE_MODEL_ID });
const getDailyPlan = async (request, response) => {
    const { messages } = request.body;
    const lastMessage = messages.pop();
    const chat = googleModel.startChat({
        history: messages
    });
    const result = await chat.sendMessageStream(lastMessage.parts);
    return result;
};
exports.getDailyPlan = getDailyPlan;
