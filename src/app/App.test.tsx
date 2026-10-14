import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { OverviewPage } from '../pages/Overview'
import { S0Page } from '../pages/S0'

describe('Africa Buyer AI application', () => {
  it('offers all seven review destinations and labels synthetic content', () => {
    render(<App activePath="/" page={<OverviewPage />} />)

    const navigation = within(screen.getByRole('navigation', { name: '主要导航' }))
    expect(navigation.getAllByRole('link')).toHaveLength(7)
    expect(navigation.getByRole('link', { name: '总览' })).toHaveAttribute('href', '/')
    expect(navigation.getByRole('link', { name: '买家企业' })).toHaveAttribute('href', '/buyers')
    expect(screen.getAllByText('DEMO').length).toBeGreaterThan(0)
  })

  it('uses text-backed statuses and never passes demo-only S0 data', () => {
    render(<App activePath="/s0" page={<S0Page />} />)

    expect(screen.getByRole('heading', { name: 'S0 验收' })).toBeInTheDocument()
    expect(screen.getAllByText('未判定').length).toBeGreaterThan(0)
    expect(screen.getAllByText('未测量')).toHaveLength(9)
    expect(screen.queryByText('已通过')).not.toBeInTheDocument()
  })
})
