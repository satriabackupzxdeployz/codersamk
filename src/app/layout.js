// src/app/layout.js
export const metadata = {
  title: 'Amane Ofc Bot — Telegram Webhook',
  description: 'Telegram Bot Webhook untuk Alight Motion Premium Service',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
