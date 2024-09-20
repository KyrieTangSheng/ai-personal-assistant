import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });
import express from "express";
import eventsRoutes from "./routes/events";
import messagesRoutes from "./routes/messages";
import dialoguesRoutes from "./routes/dialogues";

//console.log("Environment Variables:", process.env);

const app = express();
const port = process.env.PORT!

app.use(express.json());
app.use("/api", eventsRoutes);
app.use("/api", messagesRoutes);
app.use("/api", dialoguesRoutes);

app.get("/", (req, res) => {
  res.send("AI Personal Assistant");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});