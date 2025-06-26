const { Telegraf } = require("telegraf");

const bot = new Telegraf("8197448307:AAH-LuSpHEa3Fl8HhgHos3Tl45W7cJgpIew");

bot.start((ctx) => {
  ctx.reply("Welcome! Use the button below to open the web app.", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Open Rendojobs App",
            web_app: { url: "https://example.com" }, // Placeholder URL, will be replaced with ngrok URL
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
