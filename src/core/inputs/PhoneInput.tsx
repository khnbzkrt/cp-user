'use client'

import { forwardRef } from 'react'
import { FormControl } from '@mui/material'
import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input'

type PhoneInputProps = MuiTelInputProps

const PhoneInput = forwardRef<HTMLDivElement, PhoneInputProps>((props, ref) => {
   return (
      <FormControl>
         <MuiTelInput {...props} ref={ref} />
      </FormControl>
   )
})

export default PhoneInput
