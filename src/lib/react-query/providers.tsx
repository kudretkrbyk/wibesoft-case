'use client'

import * as React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { makeQueryClient } from './queryClient'

export function Providers({ children }: { children: React.ReactNode }) {
  

  const [queryClient] = React.useState(() => makeQueryClient())

  React.useEffect(() => {

  }, [])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
