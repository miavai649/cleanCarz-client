import { Form, Select } from 'antd'
import { Controller } from 'react-hook-form'
import { CSelectProps } from '../../types'

const CSelect = ({ label, name, options, disabled }: CSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: '100%', marginBottom: '4px' }}
            {...field}
            disabled={disabled}
            options={options}
            size='large'
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  )
}

export default CSelect
