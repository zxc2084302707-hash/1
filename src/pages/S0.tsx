import { demoS0Input } from '../app/demo-data'
import { MetricCard } from '../components/MetricCard'
import { StatusBadge } from '../components/StatusBadge'
import { evaluateS0 } from '../domain/s0'

export function S0Page() {
  const evaluation = evaluateS0(demoS0Input)
  return (
    <div className="page">
      <header className="page-header s0-header">
        <div><span className="eyebrow">FROZEN ACCEPTANCE CONTRACT</span><h1>S0 验收</h1><p>所有指标都必须由合格真实数据测量，演示数据不进入分子或分母。</p></div>
        <div className="s0-state"><StatusBadge tone="neutral">未判定</StatusBadge><small>9 项指标未测量</small></div>
      </header>
      <div className="notice"><strong>尚不能商业化交付。</strong><span>真实验证完成前，S0 始终保持未判定。</span></div>
      <section className="metric-grid" aria-label="S0 验收指标">
        {evaluation.metrics.map((metric) => <MetricCard metric={metric} key={metric.key} />)}
      </section>
    </div>
  )
}

