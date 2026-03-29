import { ImageResponse } from 'next/og';

export const alt = 'Charlz - Frontend Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.03) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.03) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Terminal window decoration */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0f0f0f',
            border: '1px solid rgba(255, 198, 0, 0.3)',
            borderRadius: '12px',
            padding: '40px 60px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '30px',
            }}
          >
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>

          {/* Terminal prompt */}
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              color: '#888',
              marginBottom: '20px',
              fontFamily: 'monospace',
            }}
          >
            <span style={{ color: '#ffc600' }}>charlz@portfolio</span>
            <span>:</span>
            <span style={{ color: '#61dafb' }}>~</span>
            <span>$ whoami</span>
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#fff',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Charlz
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#ffc600',
                margin: 0,
              }}
            >
              Frontend Developer
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '20px',
                color: '#888',
                marginTop: '10px',
              }}
            >
              <div style={{ display: 'flex' }}>
                <span style={{ color: '#ffc600' }}>&gt;</span>
                <span style={{ marginLeft: '8px' }}>React • Next.js • TypeScript</span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ color: '#ffc600' }}>&gt;</span>
                <span style={{ marginLeft: '8px' }}>Building beautiful interfaces</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '24px',
            color: '#ffc600',
          }}
        >
          charlz.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
