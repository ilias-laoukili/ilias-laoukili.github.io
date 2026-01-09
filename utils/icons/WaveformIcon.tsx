import React from 'react'

export interface IconProps {
  className?: string;
  variant?: 'stroke' | 'solid' | 'duotone';
}

export function WaveformIcon({ className = 'w-6 h-6', variant = 'stroke' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {variant === 'duotone' && (
        <path d="M4 12H6L8 6L10 18L12 9L14 15L16 12H20" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      )}
      {/* Audio waveform */}
      <path d="M4 12H6L8 6L10 18L12 9L14 15L16 12H20" />
    </svg>
  )
}
