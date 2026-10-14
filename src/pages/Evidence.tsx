import { EvidenceList } from '../components/EvidenceList'
import { StatusBadge } from '../components/StatusBadge'

export function EvidencePage() {
  return (
    <div className="page">
      <header className="page-header">
        <div><span className="eyebrow">SOURCE PROVENANCE</span><h1>证据审核</h1><p>每条业务判断都保留来源、声明、采集时间和人工审核状态。</p></div>
        <StatusBadge tone="warning">2 条待复核</StatusBadge>
      </header>
      <div className="notice"><strong>演示证据不可计入 S0。</strong><span>真实来源缺失时保持证据缺口，不以推断补齐。</span></div>
      <EvidenceList />
    </div>
  )
}

