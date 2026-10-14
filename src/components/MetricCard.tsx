import type { S0Metric } from '../domain/types'
import { StatusBadge } from './StatusBadge'

function stateLabel(state: S0Metric['state']) {
  if (state === 'passing') return '通过'
  if (state === 'failing') return '未通过'
  return '未测量'
}

export function MetricCard({ metric }: { metric: S0Metric }) {
  const tone = metric.state === 'passing' ? 'positive' : metric.state === 'failing' ? 'danger' : 'neutral'
  const observed = metric.denominator
    ? `${metric.numerator ?? 0} / ${metric.denominator}`
    : metric.numerator === null
      ? '—'
      : String(metric.numerator)

  return (
    <article className="metric-card">
      <div className="card-row">
        <span className="eyebrow">{metric.threshold}</span>
        <StatusBadge tone={tone}>{stateLabel(metric.state)}</StatusBadge>
      </div>
      <h3>{metric.label}</h3>
      <strong className="metric-value">{observed}</strong>
      <p>{metric.note}</p>
    </article>
  )
}

