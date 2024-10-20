'use client'

import * as React from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { setAccessTokenToCookie } from '@/app/actions'
import TextInput from '@/core/inputs/TextInput'
import api from '@/lib/axiosInstance'

const MuiCard = styled(Card)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignSelf: 'center',
   width: '100%',
   padding: theme.spacing(4),
   gap: theme.spacing(2),
   margin: 'auto',
   [theme.breakpoints.up('sm')]: {
      maxWidth: '450px'
   },
   boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
   ...theme.applyStyles('dark', {
      boxShadow:
         'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
   })
}))

const SignInContainer = styled(Stack)(({ theme }) => ({
   minHeight: '100%',
   padding: theme.spacing(2),
   [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4)
   },
   '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
         'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
         backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
      })
   }
}))

type FormType = {
   email: string
   password: string
}

export default function LoginForm() {
   const router = useRouter()

   const validationSchema = yup.object({
      email: yup
         .string()
         .email('Lütfen geçerli bir e-posta adresi girin')
         .required('E-Posta adresi zorunludur'),
      password: yup
         .string()
         .min(6, 'Şifreniz en az 6 karakterden oluşmalıdır')
         .required('Şifre alanı zorunludur')
   })

   const initialValues: FormType = {
      email: '',
      password: ''
   }

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async values => {
         await api
            .post('/auth/login', values)
            .then(async response => {
               await setAccessTokenToCookie(response.data?.access_token)
               router.push('/')
            })
            .catch(error => {
               if (error?.response?.data?.errors) {
                  for (const item in error.response?.data?.errors) {
                     formik.setFieldError(
                        item,
                        error?.response?.data?.errors[item]?.toString()
                     )
                  }
               }
            })
      }
   })

   return (
      <SignInContainer direction="column" justifyContent="space-between">
         <MuiCard variant="outlined">
            <Typography
               component="h1"
               variant="h4"
               sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
               Giriş Yap
            </Typography>
            <Box
               component="form"
               onSubmit={formik.handleSubmit}
               noValidate
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2
               }}
            >
               <TextInput
                  label="E-Posta"
                  name="email"
                  error={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
               />

               <TextInput
                  label="Şifre"
                  name="password"
                  error={formik.touched.password && formik.errors.password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={formik.isSubmitting}
               >
                  Giriş Yap
               </Button>
               <Typography sx={{ textAlign: 'center' }}>
                  Herhangi bir hesabın var mı?{' '}
                  <Link href="/register">Kayıt Ol</Link>
               </Typography>
            </Box>
            {/* <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
               <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => alert('Sign in with Google')}
                  startIcon={<GoogleIcon />}
               >
                  Sign in with Google
               </Button>
               <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => alert('Sign in with Facebook')}
                  startIcon={<FacebookIcon />}
               >
                  Sign in with Facebook
               </Button>
            </Box> */}
         </MuiCard>
      </SignInContainer>
   )
}
