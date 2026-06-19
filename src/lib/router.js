// src/lib/router.js
// Menerima update dari Telegram dan meneruskan ke handler yang sesuai

import { handleStart } from './handlers/start.js';
import { handleAmpremium } from './handlers/ampremium.js';
import { handleAmverify } from './handlers/amverify.js';
import { sendMessage } from './telegram.js';

/**
 * Parse perintah dari teks pesan Telegram
 * Menangani format /command@botname atau /command
 */
function parseCommand(text) {
  if (!text || !text.startsWith('/')) return null;
  const match = text.match(/^\/([a-zA-Z0-9_]+)(?:@\w+)?(?:\s+([\s\S]*))?$/);
  if (!match) return null;
  return {
    command: match[1].toLowerCase(),
    args: (match[2] || '').trim(),
  };
}

export async function processUpdate(update) {
  const message = update.message || update.edited_message;
  if (!message || !message.text) return;

  const chatId = message.chat.id;
  const messageId = message.message_id;
  const firstName = message.from?.first_name || '';
  const text = message.text.trim();

  const parsed = parseCommand(text);

  // Bukan perintah (tidak diawali /)
  if (!parsed) {
    // Abaikan pesan biasa — bot hanya merespons perintah
    return;
  }

  const { command, args } = parsed;

  // ── Routing perintah ──────────────────────────────────────────────────────

  // /start dan /help — tampilkan menu utama
  if (['start', 'help', 'menu'].includes(command)) {
    return handleStart(chatId, firstName);
  }

  // /ampremium — kirim link premium ke email
  if (['ampremium', 'sendam', 'alightpremium', 'alightmotion'].includes(command)) {
    return handleAmpremium(chatId, messageId, args);
  }

  // /amverify — verifikasi akun dengan link
  if (['amverify', 'alightverify', 'viam', 'verifyam'].includes(command)) {
    return handleAmverify(chatId, messageId, args);
  }

  // Perintah tidak dikenal
  await sendMessage(
    chatId,
    `❓ Perintah <code>/${command}</code> tidak dikenal.\n\nKetik /start untuk melihat daftar perintah yang tersedia.`
  );
}
