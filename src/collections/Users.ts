import { CollectionConfig, AuthStrategyFunction } from 'payload'

/**
 * 1. Your Custom Authentication Strategy for Cloudflare Edge
 * This handles parsing incoming custom headers on your Worker site.
 */
const cloudflareCustomAuth: AuthStrategyFunction = async ({ payload, headers }) => {
  // Extract identifier source from your incoming Cloudflare request headers
  const incomingUserEmail = headers.get('x-user-email')

  if (!incomingUserEmail) {
    return { user: null }
  }

  // Query your Cloudflare D1 user collection using Payload Local API
  const { docs } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: incomingUserEmail,
      },
    },
    limit: 1,
    disableErrors: true,
  })

  const userRecord = docs[0]

  if (!userRecord) {
    return { user: null }
  }

  // Return the complete database document. 
  // Because it comes from the Local API, it contains required system fields natively!
  return {
    user: {
      ...userRecord,
      collection: 'users',
    },
  }
}

/**
 * 2. Main Collection Configuration Definition
 * This tells Payload CMS and Drizzle how to construct tables inside your Cloudflare D1 DB.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // 🌟 This connects your custom validation function into Payload's lifecycle hooks
    strategies: [
      {
        name: 'cloudflare-header-strategy',
        authenticate: cloudflareCustomAuth,
      },
    ],
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // This explicit definition satisfies the "missing role" error constraint safely 
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
}

export default Users
