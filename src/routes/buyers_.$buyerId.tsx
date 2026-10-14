import { createFileRoute } from '@tanstack/react-router'
import { BuyerDetailPage } from '../pages/BuyerDetail'

export const Route = createFileRoute('/buyers_/$buyerId')({ component: BuyerDetailRoute })

function BuyerDetailRoute() {
  const { buyerId } = Route.useParams()
  return <BuyerDetailPage buyerId={buyerId} />
}
