type StatusTone = 'demo' | 'positive' | 'warning' | 'neutral' | 'danger'

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: StatusTone }) {
  return <span className={`status-badge ${tone}`}>{children}</span>
}

import type { ReactNode } from 'react'

