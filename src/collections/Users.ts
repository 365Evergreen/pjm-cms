import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
   auth: {
    // Optional custom cookie or token settings for edge execution
    tokenExpiration: 7200, // 2 hours in seconds
    verify: false,
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
    },
  ],
}
