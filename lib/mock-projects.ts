export interface Project {
  id: string
  name: string
  slug: string
}

export const MOCK_OWNED_PROJECTS: Project[] = [
  { id: "proj_owned_1", name: "Payments Platform", slug: "payments-platform" },
  { id: "proj_owned_2", name: "Auth Service", slug: "auth-service" },
  { id: "proj_owned_3", name: "Event Bus", slug: "event-bus" },
]

export const MOCK_SHARED_PROJECTS: Project[] = [
  { id: "proj_shared_1", name: "Checkout Graph", slug: "checkout-graph" },
  { id: "proj_shared_2", name: "Notifications Hub", slug: "notifications-hub" },
]
