// src/app/page.js
// Halaman utama - Dashboard status bot

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Logo / Icon */}
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🤖</div>

        {/* Title */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 8px',
          background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Amane Ofc Bot
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '0 0 32px' }}>
          Telegram Bot Webhook — Alight Motion Premium Service
        </p>

        {/* Status */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
        }}>
          <span style={{ color: '#22c55e', fontWeight: '600', fontSize: '15px' }}>
            ✅ Webhook Server Aktif
          </span>
        </div>

        {/* Commands */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'left',
          marginBottom: '24px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>
            Perintah Tersedia
          </p>
          {[
            { cmd: '/start', desc: 'Tampilkan menu utama' },
            { cmd: '/ampremium <email>', desc: 'Kirim link premium AM' },
            { cmd: '/amverify <email> | <link>', desc: 'Verifikasi akun premium' },
          ].map(({ cmd, desc }) => (
            <div key={cmd} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              gap: '12px',
            }}>
              <code style={{
                color: '#a78bfa',
                fontSize: '12px',
                background: 'rgba(167,139,250,0.1)',
                padding: '3px 8px',
                borderRadius: '6px',
                flexShrink: 0,
              }}>
                {cmd}
              </code>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: '1.4' }}>
                {desc}
              </span>
            </div>
          ))}
        </div>

        {/* Endpoint */}
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          <p style={{ margin: '0 0 4px' }}>Webhook endpoint:</p>
          <code style={{ color: 'rgba(255,255,255,0.5)' }}>/api/telegram-webhook</code>
        </div>

        <div style={{ marginTop: '24px', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          Powered by <strong style={{ color: 'rgba(255,255,255,0.4)' }}>Amane Ofc</strong> × Next.js × Vercel
        </div>
      </div>
    </main>
  );
}
