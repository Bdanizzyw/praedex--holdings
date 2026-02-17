import Link from 'next/link'
import React from 'react'

interface PropertyCardProps {
  id: string
  type: 'property' | 'hotel' | 'land' | 'shortlet'
  title: string
  price: number
  distance?: number
  rating?: number
  reviews?: number
  onDirections?: () => void
}

const typeConfig = {
  property: { icon: '🏠', label: 'Property', gradient: 'linear-gradient(135deg, #1a3a5c, #2563eb)', badgeText: '#1d4ed8' },
  hotel:    { icon: '🏨', label: 'Hotel',    gradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)', badgeText: '#6d28d9' },
  shortlet: { icon: '🛎️', label: 'Shortlet', gradient: 'linear-gradient(135deg, #0c4a6e, #0891b2)', badgeText: '#0e7490' },
  land:     { icon: '🏞️', label: 'Land',     gradient: 'linear-gradient(135deg, #064e3b, #059669)', badgeText: '#047857' },
}

const PropertyCardComponent = ({ id, type, title, price, distance, rating, reviews, onDirections }: PropertyCardProps) => {
  const config = typeConfig[type] || typeConfig.property
  const isNightly = type === 'hotel' || type === 'shortlet'

  return (
    <div
      style={{
        background: 'white', borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.25s ease',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.13)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)'
      }}
    >
      {/* Image Area */}
      <Link href={`/properties/${id}`} style={{ textDecoration: 'none' }}>
        <div style={{
          width: '100%', height: 200, background: config.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

          <span style={{ fontSize: 52, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
            {config.icon}
          </span>

          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(255,255,255,0.95)', padding: '4px 10px',
            borderRadius: 100, fontSize: 11, fontWeight: 700,
            color: config.badgeText, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            {config.label}
          </div>

          {distance !== undefined && (
            <div style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              color: 'white', padding: '4px 10px', borderRadius: 100, fontSize: 12, fontWeight: 500,
            }}>
              📍 {distance.toFixed(1)} km
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 14px' }}>
          <h3 style={{
            fontSize: 16, fontWeight: 700, color: '#0f172a',
            marginBottom: 8, lineHeight: 1.3,
            overflow: 'hidden', maxHeight: '2.6em',
          }}>
            {title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
              ${price.toLocaleString()}
            </span>
            {isNightly && (
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>/night</span>
            )}
          </div>

          {rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} style={{ fontSize: 11, color: i <= Math.round(rating) ? '#f59e0b' : '#e2e8f0' }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
                {rating} ({reviews?.toLocaleString()} reviews)
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Footer Buttons */}
      <div style={{ padding: '0 20px 18px', marginTop: 'auto', display: 'flex', gap: 8 }}>
        <Link href={`/properties/${id}`} style={{
          flex: 1, textDecoration: 'none', background: '#f8fafc',
          border: '1px solid #e2e8f0', color: '#374151', padding: '10px',
          borderRadius: 10, fontWeight: 600, fontSize: 13, textAlign: 'center',
        }}>
          View Details
        </Link>
        {onDirections && (
          <button onClick={onDirections} style={{
            flex: 1, background: config.gradient, border: 'none',
            color: 'white', padding: '10px', borderRadius: 10,
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            📍 Directions
          </button>
        )}
      </div>
    </div>
  )
}

export const PropertyCard = React.memo(PropertyCardComponent)
