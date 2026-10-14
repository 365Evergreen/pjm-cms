import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({
    config,
})

await payload.create({
    collection: 'users',
    data: {
        email: 'paul@365evergreen.com',
        password: 'TempPassword123!',
    },
})

console.log('User created')
process.exit(0)