import { describe, it, beforeAll, expect } from 'vitest'
import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config'

let payload: Payload

describe('Payload API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('can query users collection', async () => {
    const users = await payload.find({ collection: 'users' })
    expect(users).toBeDefined()
    expect(Array.isArray(users.docs)).toBe(true)
  })
})
