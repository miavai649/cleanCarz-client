import { Form, Input } from 'antd'
import { Controller } from 'react-hook-form'
import { CInputProps } from '../../types'
import { MdErrorOutline } from 'react-icons/md'

const CInput = ({ type, name, label, placeholder }: CInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              id={name}
              size='large'
            />
            {error && (
              <small className='text-red-500 mt-1 flex items-center animate-slide-in'>
                <MdErrorOutline size={15} className='mr-1 ' />
                {error.message}
              </small>
            )}
          </Form.Item>
        )}
      />
    </div>
  )
}

export default CInput
