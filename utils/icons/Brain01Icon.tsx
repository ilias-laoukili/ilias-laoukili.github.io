import React from 'react'

export interface IconProps {
  className?: string;
  variant?: 'stroke' | 'solid' | 'duotone';
}

export function Brain01Icon({ className = 'w-6 h-6', variant = 'stroke' }: IconProps) {
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
      <path d="M12 4.5C12 3.12 10.88 2 9.5 2C8.12 2 7 3.12 7 4.5V5" />
      <path d="M12 4.5C12 3.12 13.12 2 14.5 2C15.88 2 17 3.12 17 4.5V5" />
      <path d="M17 8C18.1 8 19 7.1 19 6C19 4.9 18.1 4 17 4" />
      <path d="M7 8C5.9 8 5 7.1 5 6C5 4.9 5.9 4 7 4" />
      <path d="M19 13C20.66 13 22 11.66 22 10C22 8.34 20.66 7 19 7" />
      <path d="M5 13C3.34 13 2 11.66 2 10C2 8.34 3.34 7 5 7" />
      <path d="M19 13V16C19 19.31 16.31 22 13 22H11C7.69 22 5 19.31 5 16V13" />
      <path d="M12 22V12" />
      {variant === 'duotone' && (
        <path d="M7 8H17V13C17 16.31 14.76 19 12 19C9.24 19 7 16.31 7 13V8Z" fill="currentColor" fillOpacity="0.2" stroke="none" />
      )}
    </svg>
  )
}
