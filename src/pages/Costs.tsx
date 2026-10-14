import { StatusBadge } from '../components/StatusBadge'

export function CostsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <div><span className="eyebrow">COST CONTROL</span><h1>成本台账</h1><p>记录每项外部数据支出、授权和合格买家产出。</p></div>
        <StatusBadge tone="positive">无新增费用</StatusBadge>
      </header>
      <section className="summary-grid two-up">
        <article className="summary-card emphasis"><span className="eyebrow">ACTUAL SPEND</span><strong>¥0</strong><p>预算上限 ¥1,000</p></article>
        <article className="summary-card"><span className="eyebrow">COST / QUALIFIED BUYER</span><strong>未测量</strong><p>合格 A/B 买家分母为 0</p></article>
      </section>
      <section className="empty-state"><span className="empty-icon">¥</span><h2>尚无外部数据费用</h2><p>任何付费 API 或服务都需事前批准，并记录实际费用与产出。</p></section>
    </div>
  )
}

