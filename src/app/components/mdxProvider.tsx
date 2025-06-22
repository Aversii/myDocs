'use client'

import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { components } from './mdxComponent'



export function MdxProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
