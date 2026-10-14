import { demoBuyers } from '../app/demo-data'
import { BuyerCard } from '../components/BuyerCard'
import { StatusBadge } from '../components/StatusBadge'

export function BuyersPage() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">BUYER PIPELINE</span>
          <h1>买家企业</h1>
          <p>集中查看企业身份、匹配理由、证据完整度和人工审核状态。</p>
        </div>
        <StatusBadge tone="demo">3 条 DEMO</StatusBadge>
      </header>
      <div className="filter-bar" aria-label="筛选摘要">
        <span>市场：尼日利亚</span><span>品类：小家电</span><span>真实记录：0</span>
      </div>
      <section className="buyer-grid" aria-label="买家列表">
        {demoBuyers.map((buyer) => <BuyerCard buyer={buyer} key={buyer.id} />)}
      </section>
    </div>
  )
}

