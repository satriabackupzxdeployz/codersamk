// src/app/api/setup-webhook/route.js
// Endpoint untuk mendaftarkan webhook URL ke Telegram secara otomatis

import { NextResponse } from 'next/server';

export async function GET(req) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const WEBHOOK_URL = process.env.WEBHOOK_URL;

  if (!BOT_TOKEN) {
    return NextResponse.json({ error: 'TELEGRAM_BOT_TOKEN belum diset di environment variables' }, { status: 500 });
  }

  if (!WEBHOOK_URL) {
    return NextResponse.json({ error: 'WEBHOOK_URL belum diset di environment variables' }, { status: 500 });
  }

  const webhookUrl = `${WEBHOOK_URL}/api/telegram-webhook`;

  try {
    // Daftarkan webhook ke Telegram
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message', 'edited_message', 'callback_query'],
        }),
      }
    );

    const data = await res.json();

    // Ambil info webhook saat ini untuk konfirmasi
    const infoRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`
    );
    const info = await infoRes.json();

    return NextResponse.json({
      setup_result: data,
      webhook_info: info.result,
      registered_url: webhookUrl,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
