import { demoBuyers } from '../app/demo-data'
import { EvidenceList } from '../components/EvidenceList'
import { StatusBadge } from '../components/StatusBadge'

export function BuyerDetailPage({ buyerId }: { buyerId: string }) {
  const buyer = demoBuyers.find((candidate) => candidate.id === buyerId)

  if (!buyer) {
    return (
      <div className="page">
        <header className="page-header">
          <div>
            <span className="eyebrow">BUYER</span>
            <h1>未找到买家</h1>
            <p>该记录不存在，或当前租户无权访问。</p>
          </div>
          <a className="secondary-action" href="/buyers">返回列表</a>
        </header>
      </div>
    )
  }
  return (
    <div className="page">
      <header className="page-header detail-header">
        <div>
          <div className="card-row compact-row">
            <StatusBadge tone="demo">DEMO</StatusBadge>
            <StatusBadge tone="positive">A级演示评分</StatusBadge>
          </div>
          <h1>{buyer.name}</h1>
          <p>{buyer.location} · {buyer.businessType}</p>
        </div>
        <a className="secondary-action" href="/buyers">返回列表</a>
      </header>
      <section className="detail-grid">
        <article className="panel">
          <span className="eyebrow">MATCH RATIONALE</span>
          <h2>匹配理由</h2>
          <p>{buyer.matchReason}</p>
          <div className="tag-row">{buyer.products.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
        </article>
        <article className="panel">
          <span className="eyebrow">CONTACT</span>
          <h2>企业联系方式</h2>
          <p className="contact-value">{buyer.contact}</p>
          <StatusBadge tone="warning">仅演示 · 不可外联</StatusBadge>
        </article>
      </section>
      <section className="section-block">
        <div className="section-heading"><h2>关联证据</h2><span className="muted">来源链待真实数据替换</span></div>
        <EvidenceList />
      </section>
    </div>
  )
}

