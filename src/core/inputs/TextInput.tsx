'use client'

import { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { FormControl, FormLabel, TextField } from '@mui/material'

type TextInputProps = {
   label: string
   name: string
   error: string | false | undefined
   type?: HTMLInputTypeAttribute
   value: string
   onChange: (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | undefined>
   ) => void
}

export default function TextInput({
   label,
   name,
   error,
   value,
   onChange,
   type = 'text'
}: TextInputProps) {
   return (
      <FormControl>
         <TextField
            label={label}
            type={type}
            autoComplete={name}
            name={name}
            fullWidth
            id={name}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error}
            color={Boolean(error) ? 'error' : 'primary'}
         />
      </FormControl>
   )
}
