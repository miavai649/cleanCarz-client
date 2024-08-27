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
  type: string
  name: string
  label?: string
  placeholder?: string
}