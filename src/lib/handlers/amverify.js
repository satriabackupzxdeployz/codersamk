// src/lib/handlers/amverify.js
// Plugin: Alight Motion Premium Verifier
// Perintah: /amverify email | link_url

import { sendMessage, sendReaction } from '../telegram.js';

const THERESAV_API_KEY = process.env.THERESAV_API_KEY || 'ShikimoriChan';

export async function handleAmverify(chatId, messageId, args) {
  if (!args || !args.includes('|')) {
    return sendMessage(
      chatId,
      `🔐 <b>Format Salah!</b>\n\nKetik:\n<code>/amverify email_kamu@gmail.com | link_url</code>\n\nContoh:\n<code>/amverify emailkamu@gmail.com | https://alight-creative.firebaseapp.com/...</code>\n\n<i>💡 Link didapat dari langkah ke-3 perintah /ampremium</i>`
    );
  }

  const [email, link] = args.split('|').map((v) => (v ? v.trim() : ''));

  if (!email || !link) {
    return sendMessage(
      chatId,
      `⚠️ <b>Input Kurang Lengkap!</b>\n\nPastikan memasukkan email dan link dengan pemisah tanda pipa (<code>|</code>).\n\n<b>Contoh:</b> <code>/amverify email@gmail.com | https://...</code>`
    );
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return sendMessage(chatId, '❌ <b>Error:</b> Format email yang kamu masukkan tidak valid!');
  }

  // Validasi format link
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    return sendMessage(chatId, '❌ <b>Error:</b> Link harus diawali dengan <code>http://</code> atau <code>https://</code>');
  }

  // Reaksi loading
  await sendReaction(chatId, messageId, '⏳');

  try {
    const url = `https://api.theresav.biz.id/premium/alightmotion/verify?email=${encodeURIComponent(email)}&link=${encodeURIComponent(link)}&apikey=${THERESAV_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.status === true) {
      // Konversi durasi ke teks
      let rawDuration = data.data?.duration || '';
      let durationText =
        rawDuration === '1_year' ? '1 Tahun' : rawDuration.replace('_', ' ');

      const captionSuccess =
        `🎉  <b>───「 ＡＭ  ＶＥＲＩＦＩＣＡＴＩＯＮ 」───</b>\n` +
        `⚡ <i>${data.message || 'Verifikasi akun berhasil!'}</i>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        ` ◦ <b>Email Terdaftar:</b> <code>${data.data?.email || email}</code>\n` +
        ` ◦ <b>Tipe Sukses:</b> <code>${data.data?.type || 'success'}</code>\n` +
        ` ◦ <b>Durasi Paket:</b> <code>${durationText}</code> ⏳\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📋 <b>INFORMASI USER:</b>\n\n` +
        `• Akun Alight Motion kamu sekarang sudah resmi menjadi <b>PRO / PREMIUM</b>!\n` +
        `• Silakan buka aplikasi Alight Motion di HP kamu, lalu log in menggunakan email <code>${data.data?.email || email}</code>.\n` +
        `• Nikmati semua fitur premium, efek berbayar, dan ekspor video tanpa watermark sepuasnya.\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `<i>Engine System by Amane Ofc</i>`;

      await sendMessage(chatId, captionSuccess);
      await sendReaction(chatId, messageId, '✅');
    } else {
      throw new Error(data?.message || 'Gagal memverifikasi akun ke server database.');
    }
  } catch (e) {
    console.error('[amverify error]', e.message);
    await sendReaction(chatId, messageId, '❌');
    await sendMessage(chatId, `❌ <b>Verification Error:</b> ${e.message}`);
  }
}
