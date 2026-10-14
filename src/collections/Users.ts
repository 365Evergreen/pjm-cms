import { CollectionConfig, AuthStrategyFunction } from 'payload'

const cloudflareCustomAuth: AuthStrategyFunction = async ({ payload, headers }) => {
  const incomingUserEmail = headers.get('x-user-email')

  if (!incomingUserEmail) {
    return { user: null }
  }

  const { docs } = await payload.find({
    collection: 'users',
    where: {
      email: { equals: incomingUserEmail },
    },
    limit: 1,
    disableErrors: true,
  })

  const userRecord = docs[0]

  if (!userRecord) {
    return { user: null }
  }

  return {
    user: {
      ...userRecord,
      collection: 'users',
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    strategies: [
      {
        name: 'cloudflare-header-strategy',
        authenticate: cloudflareCustomAuth,
      },
    ],
  },
  // 🌟 ADD THIS ACCESS CONTROL BLOCK 🌟
  access: {
    // Allows anyone (even unauthenticated visitors) to create a new user profile/account
    create: () => true,

    // Limits reading, editing, or removing profiles strictly to administrators 
    // or the specific user who owns that specific record
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' // Only admins can hard delete users from D1
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
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
