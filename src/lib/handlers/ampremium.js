// src/lib/handlers/ampremium.js
// Plugin: Alight Motion Premium Sender
// Perintah: /ampremium <email>

import { sendMessage, sendReaction } from '../telegram.js';

const THERESAV_API_KEY = process.env.THERESAV_API_KEY || 'ShikimoriChan';

export async function handleAmpremium(chatId, messageId, args) {
  const email = args.trim();

  // Validasi: email harus ada
  if (!email) {
    return sendMessage(
      chatId,
      `📧 <b>Format Salah!</b>\n\nKetik:\n<code>/ampremium email_kamu@gmail.com</code>\n\nContoh:\n<code>/ampremium emailkamu@gmail.com</code>`
    );
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return sendMessage(chatId, '❌ <b>Error:</b> Format email yang kamu masukkan tidak valid!');
  }

  // Reaksi loading
  await sendReaction(chatId, messageId, '⏳');

  try {
    const url = `https://api.theresav.biz.id/premium/alightmotion/send?email=${encodeURIComponent(email)}&apikey=${THERESAV_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.status === true) {
      const captionGuide =
        `🎉  <b>───「 ＡＬＩＧＨＴ  ＭＯＴＩＯＮ 」───</b>\n` +
        `⚡ <i>${data.message || 'Link verifikasi berhasil dikirim!'}</i>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        ` ◦ <b>Target Email:</b> <code>${data.data?.email || email}</code>\n` +
        ` ◦ <b>Tipe Akses:</b> <code>${data.data?.type || 'need_link'}</code>\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📋 <b>LANGKAH AKTIVASI (WAJIB DIIKUTI):</b>\n\n` +
        `1️⃣ <b>Cek Kotak Masuk / Folder Spam:</b>\n` +
        `   Buka Gmail kamu. Jika tidak ada di kotak masuk, cek <b>Folder Spam</b>. Cari email terbaru dari <i>Alight Motion</i>.\n\n` +
        `2️⃣ <b>Tekan Tombol Login:</b>\n` +
        `   Buka email tersebut, ada tombol <b>"Login"</b> atau <b>"Log in to Alight Motion"</b>. Klik tombol tersebut.\n\n` +
        `3️⃣ <b>Salin Tautan / Link Akhir:</b>\n` +
        `   Setelah tombol ditekan dan browser terbuka, <b>salin seluruh URL</b> yang muncul di address bar browser kamu.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `💡 <i>Selesai disalin? Gunakan perintah berikut untuk verifikasi:</i>\n` +
        `<code>/amverify ${email} | [paste_link_disini]</code>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `<i>Engine System by Amane Ofc</i>`;

      await sendMessage(chatId, captionGuide);
      await sendReaction(chatId, messageId, '✅');
    } else {
      throw new Error(data?.message || 'Gagal mendapatkan respon sukses dari server.');
    }
  } catch (e) {
    console.error('[ampremium error]', e.message);
    await sendReaction(chatId, messageId, '❌');
    await sendMessage(chatId, `❌ <b>Gagal Mengirim Premium:</b> ${e.message}`);
  }
}
