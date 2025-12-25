'use client'

import React, { useEffect, useState } from 'react'

export interface IconProps {
  iconName?: string
  size?: number
  variant?: 'stroke' | 'solid' | 'bulk' | 'duotone' | 'twotone'
  type?: 'sharp' | 'rounded' | 'standard'
  color?: string
  strokeWidth?: number
  className?: string // Keeping classname to avoid mistakes on older projects
  style?: string
}

const iconCache = new Map<string, string>()

export function Icon({
  iconName = 'default-icon',
  size = 24,
  variant = 'solid',
  type = 'rounded',
  color = 'currentColor',
  strokeWidth = 1.5,
  className,
}: IconProps) {
  const [svgElement, setSvgElement] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const iconUrl = `https://cdn.hugeicons.com/icons/${iconName}-${variant}-${type}.svg`

    async function fetchIcon() {
      if (iconCache.has(iconUrl)) {
        const svgText = iconCache.get(iconUrl)!
        parseSVG(svgText)
        return
      }

      try {
        const response = await fetch(iconUrl, { signal })
        if (!response.ok) throw new Error('Failed to fetch icon')
        const svgText = await response.text()
        iconCache.set(iconUrl, svgText)
        parseSVG(svgText)
      } catch (error) {
        if (!signal.aborted) {
          console.error(`Error loading SVG icon: ${error}`)
          setSvgElement(null)
        }
      }
    }

    function parseSVG(svgText: string) {
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgNode = svgDoc.documentElement

      svgNode.setAttribute('width', size.toString())
      svgNode.setAttribute('height', size.toString())
      svgNode.setAttribute('color', color)

      svgNode.querySelectorAll('*').forEach((element) => {
        if (element.hasAttribute('fill')) {
          element.setAttribute('fill', 'currentColor')
        }
        if (element.hasAttribute('stroke')) {
          element.setAttribute('stroke', 'currentColor')
          element.setAttribute('stroke-width', strokeWidth.toString())
        }
      })

      setSvgElement(
        React.createElement('svg', {
          dangerouslySetInnerHTML: { __html: svgNode.innerHTML },
          className,
          ...Array.from(svgNode.attributes).reduce(
            (acc, attr) => ({ ...acc, [attr.name]: attr.value }),
            {},
          ),
        }),
      )
    }

    fetchIcon()

    return () => controller.abort()
  }, [iconName, size, variant, type, color, strokeWidth])

  return svgElement
}
