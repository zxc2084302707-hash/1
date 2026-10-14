import { createFileRoute } from '@tanstack/react-router'
import { BuyerDetailPage } from '../pages/BuyerDetail'

export const Route = createFileRoute('/buyers/$buyerId')({ component: BuyerDetailPage })

