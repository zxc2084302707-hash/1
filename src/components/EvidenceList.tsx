import { demoEvidence } from '../app/demo-data'
import { StatusBadge } from './StatusBadge'

export function EvidenceList() {
  return (
    <div className="stack-list">
      {demoEvidence.map((item) => (
        <article className="evidence-row" key={item.id}>
          <div>
            <div className="card-row compact-row">
              <StatusBadge tone="demo">DEMO</StatusBadge>
              <span className="muted">{item.buyer}</span>
            </div>
            <h3>{item.claim}</h3>
            <code>{item.source}</code>
          </div>
          <StatusBadge tone="warning">{item.status}</StatusBadge>
        </article>
      ))}
    </div>
  )
}

