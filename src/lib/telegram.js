// src/lib/telegram.js
// Helper functions untuk mengirim pesan ke Telegram Bot API

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * Kirim pesan teks ke chat tertentu
 */
export async function sendMessage(chatId, text, extra = {}) {
  const res = await fetch(`${BASE_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      ...extra,
    }),
  });
  return res.json();
}

/**
 * Kirim reaksi emoji ke pesan tertentu
 */
export async function sendReaction(chatId, messageId, emoji) {
  const res = await fetch(`${BASE_URL}/setMessageReaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      reaction: [{ type: 'emoji', emoji }],
    }),
  });
  return res.json();
}

/**
 * Reply langsung ke pesan pengirim
 */
export async function replyMessage(chatId, replyToMessageId, text) {
  return sendMessage(chatId, text, {
    reply_to_message_id: replyToMessageId,
  });
}
