import { demoBuyers } from '../app/demo-data'
import { BuyerCard } from '../components/BuyerCard'
import { StatusBadge } from '../components/StatusBadge'

export function OverviewPage() {
  return (
    <div className="page">
      <header className="page-header hero-header">
        <div>
          <span className="eyebrow">NIGERIA · SMALL APPLIANCES</span>
          <h1>买家情报工作台</h1>
          <p>用可追溯证据筛选企业、核验联系方式，并让每一项 S0 结论都能被复查。</p>
        </div>
        <div className="hero-status">
          <span>当前验收状态</span>
          <strong>未判定</strong>
          <small>真实指标尚未测量</small>
        </div>
      </header>

      <section className="summary-grid" aria-label="项目摘要">
        <article className="summary-card emphasis">
          <span className="eyebrow">REAL CANDIDATES</span>
          <strong>0</strong>
          <p>目标 100 家 · 当前仅有演示记录</p>
        </article>
        <article className="summary-card">
          <span className="eyebrow">VERIFIED CONTACTS</span>
          <strong>0 / 100</strong>
          <p>目标至少 60 家</p>
        </article>
        <article className="summary-card">
          <span className="eyebrow">EXTERNAL COST</span>
          <strong>¥0</strong>
          <p>预算上限 ¥1,000</p>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WORKING SAMPLE</span>
            <h2>演示买家</h2>
          </div>
          <StatusBadge tone="demo">DEMO · 不计入验收</StatusBadge>
        </div>
        <div className="buyer-grid">
          {demoBuyers.slice(0, 2).map((buyer) => <BuyerCard buyer={buyer} key={buyer.id} />)}
        </div>
      </section>
    </div>
  )
}

