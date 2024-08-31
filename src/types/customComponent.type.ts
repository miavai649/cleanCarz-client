import { ReactNode } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export type CFormConfig = {
  defaultValues?: Record<string, any>
  resolver?: any
}

export type CFormProps = {
  onSubmit: SubmitHandler<FieldValues>
  children: ReactNode
} & CFormConfig

export type CInputProps = {
  type?: string
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
}

export type CSelectProps = {
  label: string
  name: string
  disabled?: boolean
  options: { value: string; label: string; disabled?: boolean }[] | undefined
}
