import { demoBuyers } from '../app/demo-data'
import { StatusBadge } from '../components/StatusBadge'

export function ContactsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <div><span className="eyebrow">CONTACT VERIFICATION</span><h1>联系方式</h1><p>同时核验企业归属、可用性与合法使用依据。</p></div>
        <StatusBadge tone="demo">DEMO</StatusBadge>
      </header>
      <section className="record-table" aria-label="联系方式核验列表">
        <div className="record-table-head"><span>企业</span><span>联系方式</span><span>验证状态</span><span>使用状态</span></div>
        {demoBuyers.map((buyer) => (
          <article className="record-row" key={buyer.id}>
            <div data-label="企业"><strong>{buyer.name}</strong><small>{buyer.location}</small></div>
            <div data-label="联系方式"><code>{buyer.contact}</code></div>
            <div data-label="验证状态"><StatusBadge tone={buyer.contactStatus === 'verified' ? 'positive' : 'warning'}>{buyer.contactStatus === 'verified' ? '演示已验证' : '待验证'}</StatusBadge></div>
            <div data-label="使用状态"><StatusBadge tone="danger">禁止外联</StatusBadge></div>
          </article>
        ))}
      </section>
    </div>
  )
}

