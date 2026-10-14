import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import { App } from '../app/App'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Evidence-led African B2B buyer intelligence for Chinese exporters.' },
      { title: 'Africa Buyer AI' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function RootComponent() {
  const activePath = useRouterState({ select: (state) => state.location.pathname })
  return <RootDocument><App activePath={activePath} page={<Outlet />} /></RootDocument>
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  )
}

function NotFoundPage() {
  return (
    <section className="empty-state">
      <span className="eyebrow">404</span>
      <h1>页面不存在</h1>
      <p>该地址没有对应的买家情报页面。</p>
      <a className="secondary-action" href="/">返回总览</a>
    </section>
  )
}

