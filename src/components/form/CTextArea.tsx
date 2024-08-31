import { Form } from 'antd'
import { Controller } from 'react-hook-form'
import { CInputProps } from '../../types'
import { MdErrorOutline } from 'react-icons/md'
import TextArea from 'antd/es/input/TextArea'

const CTextArea = ({ name, label, placeholder, disabled }: CInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TextArea
              {...field}
              placeholder={placeholder}
              id={name}
              showCount
              maxLength={100}
              disabled={disabled}
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

export default CTextArea
