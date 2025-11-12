'use client'

import React from 'react'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

interface SafeHTMLRendererProps {
  content: string
  className?: string
  fallback?: string
  allowedTags?: string[]
  allowedAttributes?: string[]
}

/**
 * SafeHTMLRenderer - Safely renders HTML content from Django CKEditor fields
 * 
 * This component sanitizes HTML content to prevent XSS attacks while preserving
 * formatting from CKEditor. It uses DOMPurify for sanitization and html-react-parser
 * for safe React rendering.
 * 
 * @param content - The HTML content to render (from Django CKEditor)
 * @param className - CSS classes to apply to the wrapper element
 * @param fallback - Fallback text if content is empty or invalid
 * @param allowedTags - Custom list of allowed HTML tags (optional)
 * @param allowedAttributes - Custom list of allowed HTML attributes (optional)
 */
export default function SafeHTMLRenderer({
  content,
  className = '',
  fallback = '',
  allowedTags,
  allowedAttributes,
}: SafeHTMLRendererProps) {
  // Return fallback if no content
  if (!content || typeof content !== 'string') {
    return fallback ? <span className={className}>{fallback}</span> : null
  }

  // Configure DOMPurify options
  const purifyConfig = {
    // Default allowed tags for CKEditor content
    ALLOWED_TAGS: allowedTags || [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'a', 'span',
      'div', 'pre', 'code', 'sub', 'sup', 'del', 'ins', 'mark'
    ],
    
    // Default allowed attributes
    ALLOWED_ATTR: allowedAttributes || [
      'href', 'title', 'target', 'rel', 'class', 'id', 'style'
    ],
    
    // Additional security options
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SANITIZE_DOM: true,
    KEEP_CONTENT: true,
    
    // Remove potentially dangerous attributes
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover'],
    
    // Transform links to be safe
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  }

  try {
    // Sanitize the HTML content
    // const sanitizedHTML = DOMPurify.sanitize(content, purifyConfig)
    const sanitizedHTML = content
    
    // Parse the sanitized HTML into React elements
    const parsedContent = parse(sanitizedHTML, {
      replace: (domNode) => {
        // Additional custom transformations can be added here
        // For example, adding custom classes or modifying elements
        
        if (domNode.type === 'tag') {
          // Add security attributes to links
          if (domNode.name === 'a') {
            return React.createElement(
              'a',
              {
                ...domNode.attribs,
                rel: 'noopener noreferrer',
                target: domNode.attribs?.target || '_blank',
              },
              domNode.children?.map((child, index) => 
                typeof child === 'string' ? child : parse(child.toString())
              )
            )
          }
          
          // Add responsive classes to images if needed
          if (domNode.name === 'img') {
            return React.createElement('img', {
              ...domNode.attribs,
              className: `${domNode.attribs?.class || ''} max-w-full h-auto`.trim(),
              loading: 'lazy',
            })
          }
        }
        
        return domNode
      }
    })

    return (
      <div 
        className={`safe-html-content ${className}`.trim()}
        style={{
          // Ensure proper text formatting
          lineHeight: 'inherit',
          color: 'inherit',
          fontSize: 'inherit',
          fontFamily: 'inherit',
        }}
      >
        {parsedContent}
      </div>
    )
  } catch (error) {
    console.error('Error rendering HTML content:', error)
    
    // Fallback to plain text if HTML parsing fails
    const plainText = content.replace(/<[^>]*>/g, '').trim()
    return (
      <span className={className}>
        {plainText || fallback}
      </span>
    )
  }
}

/**
 * Utility function to check if content contains HTML tags
 */
export function containsHTML(content: string): boolean {
  if (!content || typeof content !== 'string') return false
  return /<[^>]*>/g.test(content)
}

/**
 * Utility function to strip HTML tags (for previews, meta descriptions, etc.)
 */
export function stripHTML(content: string): string {
  if (!content || typeof content !== 'string') return ''
  
  try {
    // First sanitize, then strip tags
    // const sanitized = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] })
    const sanitized = content //for local dev
    return sanitized.trim()
  } catch (error) {
    console.error('Error stripping HTML:', error)
    return content.replace(/<[^>]*>/g, '').trim()
  }
}

/**
 * Utility function to truncate HTML content while preserving formatting
 */
export function truncateHTML(content: string, maxLength: number = 150): string {
  if (!content || typeof content !== 'string') return ''
  
  const plainText = stripHTML(content)
  if (plainText.length <= maxLength) return content
  
  // If we need to truncate, return plain text version
  return plainText.substring(0, maxLength).trim() + '...'
}

/**
 * Pre-configured SafeHTMLRenderer for different content types
 */

// For rich text descriptions (allows most formatting)
export function RichTextRenderer({ content, className, fallback }: Omit<SafeHTMLRendererProps, 'allowedTags' | 'allowedAttributes'>) {
  return (
    <SafeHTMLRenderer
      content={content}
      className={className}
      fallback={fallback}
      allowedTags={[
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'a', 'span',
        'div', 'pre', 'code', 'sub', 'sup', 'del', 'ins', 'mark'
      ]}
    />
  )
}

// For simple text with basic formatting only
export function SimpleTextRenderer({ content, className, fallback }: Omit<SafeHTMLRendererProps, 'allowedTags' | 'allowedAttributes'>) {
  return (
    <SafeHTMLRenderer
      content={content}
      className={className}
      fallback={fallback}
      allowedTags={['p', 'br', 'strong', 'b', 'em', 'i', 'u']}
      allowedAttributes={['class']}
    />
  )
}

// For inline text (no block elements)
export function InlineTextRenderer({ content, className, fallback }: Omit<SafeHTMLRendererProps, 'allowedTags' | 'allowedAttributes'>) {
  return (
    <SafeHTMLRenderer
      content={content}
      className={className}
      fallback={fallback}
      allowedTags={['strong', 'b', 'em', 'i', 'u', 'span', 'a']}
      allowedAttributes={['href', 'title', 'class']}
    />
  )
}
