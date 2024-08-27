import { Form } from 'antd'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { CFormConfig, CFormProps } from '../../types'

const CForm = ({ onSubmit, children, defaultValues, resolver }: CFormProps) => {
  const formConfig: CFormConfig = {}

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues
  }

  if (resolver) {
    formConfig['resolver'] = resolver
  }

  const methods = useForm(formConfig)

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <Form layout='vertical' onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  )
}

export default CForm
