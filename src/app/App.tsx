import type { ReactNode } from 'react'
import { AppShell } from '../components/AppShell'

interface AppProps {
  activePath: string
  page: ReactNode
}

export function App({ activePath, page }: AppProps) {
  return <AppShell activePath={activePath}>{page}</AppShell>
}

