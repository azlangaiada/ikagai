import type { CollectionBeforeValidateHook } from 'payload'

type SubmissionEntry = { field: string; value: string }

type HCaptchaBlock = {
  blockType: string
  secretKey?: string
}

export const verifyHCaptcha: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data) return data

  const formID = (data as { form?: string | number }).form
  const submissionData = ((data as { submissionData?: SubmissionEntry[] }).submissionData) || []

  if (!formID) return data

  const form = await req.payload.findByID({
    collection: 'forms',
    id: formID,
    depth: 0,
  })

  const blocks = (form?.fields || []) as HCaptchaBlock[]
  const captchaBlock = blocks.find((b) => b.blockType === 'hCaptcha')

  if (!captchaBlock) return data

  if (!captchaBlock.secretKey) {
    throw new Error('hCaptcha secret key is not configured on this form.')
  }

  const token = submissionData.find((entry) => entry.field === 'hCaptcha')?.value
  if (!token) {
    throw new Error('Missing hCaptcha token.')
  }

  const verifyRes = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: captchaBlock.secretKey,
      response: token,
    }).toString(),
  })

  const verifyJson = (await verifyRes.json()) as { success?: boolean; 'error-codes'?: string[] }
  if (!verifyJson.success) {
    throw new Error(`hCaptcha verification failed: ${(verifyJson['error-codes'] || []).join(', ') || 'unknown'}`)
  }

  const filtered = submissionData.filter((entry) => entry.field !== 'hCaptcha')
  return { ...data, submissionData: filtered }
}
