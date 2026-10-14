import type { ReactNode } from 'react'
import { navigation } from '../app/routes'

interface AppShellProps {
  activePath: string
  children: ReactNode
}

export function AppShell({ activePath, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Africa Buyer AI 首页">
          <span className="brand-mark">AB</span>
          <span>
            <strong>Africa Buyer AI</strong>
            <small>Evidence workspace</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="主要导航">
          {navigation.map((item, index) => (
            <a
              className={activePath === item.href ? 'nav-link active' : 'nav-link'}
              href={item.href}
              key={item.href}
            >
              <span aria-hidden="true" className="nav-index">0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="eyebrow">S0 STATUS</span>
          <strong>未判定</strong>
          <p>真实数据尚未测量</p>
        </div>
      </aside>

      <div className="mobile-header">
        <a className="brand compact" href="/">
          <span className="brand-mark">AB</span>
          <strong>Africa Buyer AI</strong>
        </a>
        <details className="mobile-menu">
          <summary aria-label="打开导航">菜单</summary>
          <nav aria-label="移动导航">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.shortLabel}
              </a>
            ))}
          </nav>
        </details>
      </div>

      <main className="main-content">{children}</main>
    </div>
  )
}

