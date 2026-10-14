import { createFileRoute } from '@tanstack/react-router'
import { BuyersPage } from '../pages/Buyers'

export const Route = createFileRoute('/buyers')({ component: BuyersPage })

