import React from 'react'
import type { UseFormRegister, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Error } from '../Error'

export const FileField: React.FC<{
  name: string
  label: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: Partial<FieldErrorsImpl<FieldValues>>
}> = ({ name, label, required, register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        type="file"
        accept=".pdf"
        {...register(name, { required })}
        className={errors[name] ? 'border-red-500' : ''}
      />
      {errors[name] && <Error name={name} />}
    </div>
  )
}
