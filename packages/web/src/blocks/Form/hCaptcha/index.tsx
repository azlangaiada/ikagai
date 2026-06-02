import React, { useRef, useEffect, useState, Suspense, lazy } from 'react'
import { Controller, Control, FieldValues } from 'react-hook-form'
import { Error } from '../Error'

// @hcaptcha/react-hcaptcha touches window on import. Lazy-load it so the
// widget never runs during SSR (would crash with "Element type is invalid"
// because the bundled default export resolves to an object on the server).
const HCaptcha = lazy(() => import('@hcaptcha/react-hcaptcha'))

export const HCaptchaField: React.FC<{
  siteKey: string
  control: Control<FieldValues>
  errors: { hCaptcha?: unknown }
  name?: string
}> = ({ siteKey, control, errors }) => {
  const captchaRef = useRef<unknown>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <Controller
        name="hCaptcha"
        control={control}
        rules={{ required: 'Please complete the captcha' }}
        render={({ field }) =>
          mounted ? (
            <Suspense fallback={null}>
              <HCaptcha
                ref={captchaRef as never}
                sitekey={siteKey}
                onVerify={(token) => field.onChange(token)}
                onExpire={() => field.onChange(null)}
              />
            </Suspense>
          ) : (
            <div
              aria-hidden
              className="h-[78px] w-[304px] bg-muted/40 border border-dashed border-border rounded"
            />
          )
        }
      />
      {errors.hCaptcha && <Error name="hCaptcha" />}
    </div>
  )
}
