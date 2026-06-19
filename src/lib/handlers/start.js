// src/lib/handlers/start.js
// Menampilkan menu utama ketika user ketik /start

import { sendMessage } from '../telegram.js';

export async function handleStart(chatId, firstName) {
  const name = firstName ? ` ${firstName}` : '';
  const menu =
    `👋 <b>Halo${name}! Selamat datang di Bot Amane Ofc</b> 🎉\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📋 <b>DAFTAR PERINTAH TERSEDIA:</b>\n\n` +
    `🎬 <b>ALIGHT MOTION PREMIUM</b>\n` +
    `┌ /ampremium <code>&lt;email&gt;</code>\n` +
    `│  Kirim link aktivasi premium ke email kamu\n` +
    `│  Alias: /sendam /alightpremium /alightmotion\n` +
    `│\n` +
    `└ /amverify <code>&lt;email&gt; | &lt;link&gt;</code>\n` +
    `   Verifikasi akun premium dengan link dari email\n` +
    `   Alias: /alightverify /viam /verifyam\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📌 <b>CARA PAKAI (STEP BY STEP):</b>\n\n` +
    `<b>Step 1</b> — Kirim link ke email:\n` +
    `<code>/ampremium emailkamu@gmail.com</code>\n\n` +
    `<b>Step 2</b> — Cek email, klik tombol Login, salin URL-nya\n\n` +
    `<b>Step 3</b> — Verifikasi dengan link yang disalin:\n` +
    `<code>/amverify emailkamu@gmail.com | https://alight-creative...</code>\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `ℹ️ /help — Tampilkan menu ini lagi\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `<i>Powered by Amane Ofc | Engine System Theresav API</i>`;

  return sendMessage(chatId, menu);
}
