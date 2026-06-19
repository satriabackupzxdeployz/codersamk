// src/app/api/telegram-webhook/route.js
// Webhook endpoint yang menerima update dari Telegram

import { NextResponse } from 'next/server';
import { processUpdate } from '@/lib/router';

// Validasi bahwa request benar dari Telegram menggunakan secret token
function isValidRequest(req) {
  // Jika WEBHOOK_SECRET tidak diset, lewati validasi (development mode)
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) return true;

  const headerToken = req.headers.get('x-telegram-bot-api-secret-token');
  return headerToken === secret;
}

export async function POST(req) {
  try {
    // Validasi origin request
    if (!isValidRequest(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const update = await req.json();

    // Proses update secara async — kembalikan 200 dulu biar Telegram tidak retry
    processUpdate(update).catch((err) => {
      console.error('[Webhook] processUpdate error:', err);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Webhook] Fatal error:', err);
    // Tetap kembalikan 200 agar Telegram tidak flood retry
    return NextResponse.json({ ok: true });
  }
}

// GET — dipakai untuk cek status / health check
export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  return NextResponse.json({
    status: 'Telegram Webhook is running ✅',
    bot: botToken ? `...${botToken.slice(-6)}` : 'NOT SET ❌',
    timestamp: new Date().toISOString(),
  });
}
