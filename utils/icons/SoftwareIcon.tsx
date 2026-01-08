import React from 'react'

export interface IconProps {
  className?: string;
  variant?: 'stroke' | 'solid' | 'duotone';
}

export function SoftwareIcon({ className = 'w-6 h-6', variant = 'stroke' }: IconProps) {
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
        <path d="M4 6C4 4.9 4.9 4 6 4H18C19.1 4 20 4.9 20 6V15C20 16.1 19.1 17 18 17H6C4.9 17 4 16.1 4 15V6Z" fill="currentColor" fillOpacity="0.2" stroke="none" />
      )}
      <rect x="4" y="4" width="16" height="13" rx="2" />
      <path d="M8 20H16" />
      <path d="M12 17V20" />
      <path d="M8 9L10 11L8 13" />
      <path d="M14 13H16" />
    </svg>
  )
}
