import { createFileRoute } from '@tanstack/react-router'
import { EvidencePage } from '../pages/Evidence'

export const Route = createFileRoute('/evidence')({ component: EvidencePage })

