import React from 'react'

export interface IconProps {
  className?: string;
  variant?: 'stroke' | 'solid' | 'duotone';
}

export function KnightShieldIcon({ className = 'w-6 h-6', variant = 'stroke' }: IconProps) {
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
        <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="none" />
      )}
      <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" />
      <path d="M12 8V12" />
      <path d="M12 16H12.01" />
    </svg>
  )
}
