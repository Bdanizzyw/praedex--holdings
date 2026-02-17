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
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTar
