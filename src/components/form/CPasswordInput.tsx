import { Form, Input } from 'antd'
import { Controller } from 'react-hook-form'
import { CInputProps } from '../../types'

const CPasswordInput = ({ type, name, label, placeholder }: CInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input.Password
              {...field}
              type={type}
              placeholder={placeholder}
              id={name}
              size='large'
              style={{ width: '100%', marginBottom: '4px' }}
            />
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  )
}

export default CPasswordInput
