import { createFileRoute } from '@tanstack/react-router'
import { CostsPage } from '../pages/Costs'

export const Route = createFileRoute('/costs')({ component: CostsPage })

