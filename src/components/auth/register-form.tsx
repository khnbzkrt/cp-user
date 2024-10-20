'use client'

import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import PhoneInput from '@/core/inputs/PhoneInput'
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
   boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
   [theme.breakpoints.up('sm')]: {
      width: '450px'
   },
   ...theme.applyStyles('dark', {
      boxShadow:
         'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
   })
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
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
   name: string
   surname: string
   email: string
   phone: string
   password: string
   password_confirmation: string
}

export default function RegisterForm() {
   const router = useRouter()
   const validationSchema = yup.object({
      name: yup.string().required('Ad alanı zorunludur'),
      surname: yup.string().required('Soyad alanı zorunludur'),
      email: yup
         .string()
         .email('Lütfen geçerli bir e-posta adresi girin')
         .required('E-Posta adresi zorunludur'),
      phone: yup.string().required('Telefon numarası zorunludur'),
      password: yup
         .string()
         .min(6, 'Şifreniz en az 6 karakterden oluşmalıdır')
         .required('Şifre alanı zorunludur'),
      password_confirmation: yup
         .string()
         .min(6, 'Şifreniz en az 6 karakterden oluşmalıdır')
         .required('Şifre alanı zorunludur')
   })

   const initialValues: FormType = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: ''
   }

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async values => {
         await api
            .post('/auth/register', values)
            .then(() => {
               router.push('/login')
            })
            .catch(error => {
               if (error?.response?.data?.errors) {
                  for (let item in error.response?.data?.errors) {
                     formik.setFieldError(
                        item,
                        error?.response?.data?.errors[item]?.toString()
                     )
                  }
               }
            })
      }
   })

   const handlePhoneChange = (phone: string) => {
      formik.setFieldValue('phone', phone)
   }

   return (
      <SignUpContainer direction="column" justifyContent="space-between">
         <MuiCard variant="outlined">
            <Typography
               component="h1"
               variant="h4"
               sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
               Kayıt Ol
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
                  label="Ad"
                  name="name"
                  error={formik.touched.name && formik.errors.name}
                  onChange={formik.handleChange}
                  value={formik.values.name}
               />

               <TextInput
                  label="Soyad"
                  name="surname"
                  error={formik.touched.surname && formik.errors.surname}
                  onChange={formik.handleChange}
                  value={formik.values.surname}
               />

               <TextInput
                  label="E-Posta"
                  name="email"
                  error={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
               />

               <PhoneInput
                  label="Telefon Numarası"
                  id="phone"
                  name="phone"
                  onChange={handlePhoneChange}
                  value={formik.values.phone}
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  defaultCountry="TR"
               />

               <TextInput
                  label="Şifre"
                  name="password"
                  error={formik.touched.password && formik.errors.password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
               />

               <TextInput
                  label="Şifre Tekrar"
                  name="password_confirmation"
                  error={
                     formik.touched.password_confirmation &&
                     formik.errors.password_confirmation
                  }
                  onChange={formik.handleChange}
                  value={formik.values.password_confirmation}
                  type="password"
               />

               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={formik.isSubmitting}
               >
                  Kayıt Ol
               </Button>
               <Typography sx={{ textAlign: 'center' }}>
                  Zaten bir hesabın var mı? <Link href="/login">Giriş Yap</Link>
               </Typography>
            </Box>
            {/* <Divider>
               <Typography sx={{ color: 'text.secondary' }}>veya</Typography>
            </Divider> */}
            {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
               <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => alert('Sign up with Google')}
                  startIcon={<GoogleIcon />}
               >
                  Google ile kayıt ol
               </Button>
            </Box> */}
         </MuiCard>
      </SignUpContainer>
   )
}
