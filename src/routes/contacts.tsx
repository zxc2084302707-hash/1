import { createFileRoute } from '@tanstack/react-router'
import { ContactsPage } from '../pages/Contacts'

export const Route = createFileRoute('/contacts')({ component: ContactsPage })

