import { Form, TimePicker } from 'antd'
import { Controller } from 'react-hook-form'
import { CInputProps } from '../../types'

const CTimePicker = ({ name, label }: CInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              size='large'
              style={{ width: '100%' }}
              format={'HH:mm'}
            />
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  )
}

export default CTimePicker
