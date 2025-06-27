const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome! Use the button below to open the web app.", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Open Rendojobs App",
            web_app: { url: "https://rendojobs-frontend.vercel.app" },
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

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
