import { Request, Response } from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { ModelMessage } from "../database/messages";

export const SendMessageToModel = async(messageHistory: ModelMessage[], currentMessage: string): Promise<string> => {
    //initialize the chat model with message histories 
    const googleGenAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const googleModel = googleGenAi.getGenerativeModel({model: process.env.GOOGLE_MODEL_ID!})

    const chat = googleModel.startChat({
        history: messageHistory,
        generationConfig: {
        maxOutputTokens: 1000,
        },
    });

    return (await chat.sendMessage(currentMessage)).response.text();
}