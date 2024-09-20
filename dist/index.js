"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
const express_1 = __importDefault(require("express"));
const events_1 = __importDefault(require("./routes/events"));
const messages_1 = __importDefault(require("./routes/messages"));
const dialogues_1 = __importDefault(require("./routes/dialogues"));
//console.log("Environment Variables:", process.env);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/api", events_1.default);
app.use("/api", messages_1.default);
app.use("/api", dialogues_1.default);
app.get("/", (req, res) => {
    res.send("AI Personal Assistant");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
