const { Telegraf } = require("telegraf");
const axios = require("axios");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000; // Use port from environment or default to 3000

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  const webAppUrl = "https://rendojobs-frontend.vercel.app/register";
  console.log("Attempting to send web_app with URL:", webAppUrl);
  ctx.reply("Welcome! Use the button below to open the web app.", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Open Rendojobs App",
            web_app: { url: webAppUrl },
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.command("backend", async (ctx) => {
  try {
    const response = await axios.get("https://rendojobs-backend.onrender.com/"); // Replace with your backend URL if deployed
    ctx.reply(`Backend says: ${response.data}`);
  } catch (error) {
    console.error("Error fetching from backend:", error);
    ctx.reply("Could not connect to the backend.");
  }
});

bot.launch();

// Health check endpoint for Render
app.get("/", (req, res) => {
  res.send("Bot is running and healthy!");
});

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
