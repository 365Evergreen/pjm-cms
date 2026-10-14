import { AuthStrategyFunction } from 'payload'

export const myCloudflareAuthStrategy: AuthStrategyFunction = async ({ payload, headers }) => {
  // 1. Authenticate your incoming request (e.g., parsing a JWT, custom token, or cookie)
  const incomingUserEmail = headers.get('x-user-email') // Example identifier source

  if (!incomingUserEmail) {
    return { user: null }
  }

  // 2. Query your Cloudflare D1 user collection using Payload Local API
  // This safely fetches the full Drizzle-mapped object including createdAt, updatedAt, role, etc.
  const { docs } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: incomingUserEmail,
      },
    },
    limit: 1,
    disableErrors: true, // Gracefully handles empty records without worker fatal errors
  })

  const userRecord = docs[0]

  if (!userRecord) {
    return { user: null }
  }

  // 3. Return the fully typed structure with the correct collection marker
  return {
    user: {
      ...userRecord,
      collection: 'users',
    },
  }
}
