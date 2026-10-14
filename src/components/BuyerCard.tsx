import type { DemoBuyer } from '../app/demo-data'
import { StatusBadge } from './StatusBadge'

export function BuyerCard({ buyer }: { buyer: DemoBuyer }) {
  return (
    <article className="buyer-card">
      <div className="card-row">
        <StatusBadge tone="demo">DEMO</StatusBadge>
        <StatusBadge tone={buyer.grade === 'A' ? 'positive' : buyer.grade === 'B' ? 'warning' : 'neutral'}>
          {buyer.grade}级
        </StatusBadge>
      </div>
      <div>
        <h3>{buyer.name}</h3>
        <p className="muted">{buyer.location} · {buyer.businessType}</p>
      </div>
      <div className="tag-row">
        {buyer.products.map((product) => <span className="tag" key={product}>{product}</span>)}
      </div>
      <p>{buyer.matchReason}</p>
      <div className="card-footer">
        <span>{buyer.evidenceCount} 条证据</span>
        <a href={`/buyers/${buyer.id}`}>查看详情 →</a>
      </div>
    </article>
  )
}

