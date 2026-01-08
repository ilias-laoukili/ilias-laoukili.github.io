import React from 'react'

export interface IconProps {
  className?: string;
  variant?: 'stroke' | 'solid' | 'duotone';
}

export function ComputerCloudIcon({ className = 'w-6 h-6', variant = 'stroke' }: IconProps) {
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
        <path d="M4 16.5C4 14.29 5.79 12.5 8 12.5H16C18.21 12.5 20 14.29 20 16.5V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V16.5Z" fill="currentColor" fillOpacity="0.2" stroke="none" />
      )}
      <path d="M6.5 10C4.01 10 2 12.01 2 14.5C2 16.99 4.01 19 6.5 19H17.5C19.99 19 22 16.99 22 14.5C22 12.01 19.99 10 17.5 10C17.33 10 17.17 10.01 17 10.03" />
      <path d="M17 10C17 6.69 14.31 4 11 4C8.03 4 5.57 6.17 5.09 9.01" />
      <path d="M8 22H16" />
      <path d="M12 19V22" />
    </svg>
  )
}
