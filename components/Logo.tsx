'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  /** 'pill' = teal background badge (for white/light bg)
   *  'inline' = no background (for teal bg like the header) */
  variant?: 'pill' | 'inline'
}

export default function Logo({ size = 'md', variant = 'pill' }: LogoProps) {
  const scales = { sm: 0.85, md: 1, lg: 1.4 }
  const s = scales[size]

  const mathSize = Math.round(36 * s)
  const plusSize = Math.round(46 * s)
  const lineW = Math.round(62 * s)
  const subtitleSize = Math.round(11 * s)
  const br = Math.round(12 * s)

  const isPill = variant === 'pill'

  const mathColor = isPill ? '#0f766e' : '#ffffff'
  const subColor = isPill ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.65)'

  const inner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Math+ row */}
      <div dir="ltr" style={{ lineHeight: 1, display: 'inline-flex', alignItems: 'baseline' }}>
        <span
          style={{
            fontFamily: 'Rubik, Heebo, sans-serif',
            fontSize: mathSize,
            fontWeight: 900,
            color: mathColor,
            letterSpacing: '-0.5px',
          }}
        >
          Math
        </span>
        <span
          style={{
            fontFamily: 'Rubik, Heebo, sans-serif',
            fontSize: plusSize,
            fontWeight: 900,
            color: '#eab308',
            lineHeight: 0.85,
            textShadow: '0 0 18px rgba(234,179,8,0.6), 0 0 36px rgba(234,179,8,0.25)',
            marginLeft: 2,
          }}
        >
          +
        </span>
      </div>

      {/* Gold divider */}
      <div
        style={{
          width: lineW,
          height: 2.5,
          background: '#eab308',
          borderRadius: 2,
          boxShadow: '0 0 8px rgba(234,179,8,0.35)',
          marginTop: Math.round(5 * s),
          marginBottom: Math.round(4 * s),
        }}
      />

      {/* Hebrew subtitle */}
      <span
        style={{
          fontFamily: 'Heebo, sans-serif',
          fontSize: subtitleSize,
          fontWeight: 500,
          color: subColor,
          letterSpacing: '0.8px',
          whiteSpace: 'nowrap',
        }}
        dir="rtl"
      >
        שיעורים פרטיים וליווי במתמטיקה
      </span>
    </div>
  )

  if (!isPill) return inner

  return (
    <div
      style={{
        display: 'inline-flex',
        background: '#0f766e',
        borderRadius: br,
        padding: `${Math.round(10 * s)}px ${Math.round(20 * s)}px`,
      }}
    >
      {inner}
    </div>
  )
}
