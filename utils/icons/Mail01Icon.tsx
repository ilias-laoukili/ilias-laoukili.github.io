import React from 'react'

export interface IconProps {
  className?: string;
  variant?: 'stroke' | 'solid' | 'duotone';
}

export function Mail01Icon({ className = 'w-6 h-6', variant = 'stroke' }: IconProps) {
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
        <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.2" stroke="none" />
      )}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7L12 13L21 7" />
    </svg>
  )
}
