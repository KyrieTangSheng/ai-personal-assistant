"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageToModel = void 0;
const generative_ai_1 = require("@google/generative-ai");
const SendMessageToModel = async (messageHistory, currentMessage) => {
    //initialize the chat model with message histories 
    const googleGenAi = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const googleModel = googleGenAi.getGenerativeModel({ model: process.env.GOOGLE_MODEL_ID });
    const chat = googleModel.startChat({
        history: messageHistory,
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
    return (await chat.sendMessage(currentMessage)).response.text();
};
exports.SendMessageToModel = SendMessageToModel;
