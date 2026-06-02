/**
 * Sends a revalidation request to the Vite SSR frontend.
 * Replaces Next.js revalidatePath/revalidateTag with HTTP-based cache purging.
 */
export async function revalidateFrontend(options: {
  path?: string
  tag?: string
}): Promise<void> {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3004'
  const secret = process.env.REVALIDATION_SECRET

  if (!secret) {
    console.warn('[revalidate] REVALIDATION_SECRET not set, skipping frontend cache purge')
    return
  }

  try {
    const res = await fetch(`${frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secret}`,
      },
      body: JSON.stringify(options),
    })

    if (!res.ok) {
      console.error(`[revalidate] Frontend returned ${res.status}`)
    }
  } catch (err) {
    console.error('[revalidate] Failed to reach frontend:', err)
  }
}
