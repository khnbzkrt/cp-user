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
      <div>
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <TextField
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
      </div>
   )
}
