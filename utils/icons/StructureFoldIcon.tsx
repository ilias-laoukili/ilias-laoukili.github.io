import React from 'react'

export interface IconProps {
  className?: string;
  variant?: 'stroke' | 'solid' | 'duotone';
}

export function StructureFoldIcon({ className = 'w-6 h-6', variant = 'stroke' }: IconProps) {
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
        <>
          <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.2" stroke="none" />
          <circle cx="5" cy="12" r="2" fill="currentColor" fillOpacity="0.2" stroke="none" />
          <circle cx="19" cy="12" r="2" fill="currentColor" fillOpacity="0.2" stroke="none" />
          <circle cx="12" cy="19" r="2" fill="currentColor" fillOpacity="0.2" stroke="none" />
        </>
      )}
      {/* Graph nodes */}
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      {/* Graph edges */}
      <path d="M12 7V17" />
      <path d="M7 12H17" />
      <path d="M10.5 6.5L6.5 10.5" />
      <path d="M13.5 6.5L17.5 10.5" />
      <path d="M6.5 13.5L10.5 17.5" />
      <path d="M17.5 13.5L13.5 17.5" />
    </svg>
  )
}
