'use client'

import {
   Box,
   Button,
   Card,
   Divider,
   Link,
   Stack,
   Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import TextInput from '@/core/inputs/TextInput'
import { GoogleIcon } from './custom-icons'

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
   backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
   backgroundRepeat: 'no-repeat',
   ...theme.applyStyles('dark', {
      backgroundImage:
         'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
   })
}))

type FormType = {
   firstName: string
   lastName: string
   email: string
   password: string
   password_confirmation: string
}

export default function RegisterForm() {
   const validationSchema = yup.object({
      firstName: yup.string().required('Ad alanı zorunludur'),
      lastName: yup.string().required('Soyad alanı zorunludur'),
      email: yup
         .string()
         .email('Lütfen geçerli bir e-posta adresi girin')
         .required('E-Posta adresi zorunludur'),
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: ''
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
            <Formik
               onSubmit={values => console.log(values)}
               validationSchema={validationSchema}
               initialValues={initialValues}
               validateOnChange={true}
               validateOnBlur={true}
            >
               {({
                  values,
                  handleChange,
                  touched,
                  errors,
                  handleSubmit,
                  isSubmitting
               }) => (
                  <Form onSubmit={handleSubmit}>
                     <TextInput
                        label="Ad"
                        name="firstName"
                        error={touched.firstName && errors.firstName}
                        onChange={handleChange}
                        value={values.firstName}
                     />

                     <TextInput
                        label="Soyad"
                        name="lastName"
                        error={touched.lastName && errors.lastName}
                        onChange={handleChange}
                        value={values.lastName}
                     />

                     <TextInput
                        label="E-Posta"
                        name="email"
                        error={touched.email && errors.email}
                        onChange={handleChange}
                        value={values.email}
                        type="email"
                     />

                     <TextInput
                        label="Şifre"
                        name="password"
                        error={touched.password && errors.password}
                        onChange={handleChange}
                        value={values.password}
                        type="password"
                     />

                     <TextInput
                        label="Şifre Tekrar"
                        name="password_confirmation"
                        error={
                           touched.password_confirmation &&
                           errors.password_confirmation
                        }
                        onChange={handleChange}
                        value={values.password_confirmation}
                        type="password"
                     />

                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                     >
                        Kayıt Ol
                     </Button>
                     <Typography sx={{ textAlign: 'center' }}>
                        Zaten bir hesabın var mı?{' '}
                        <span>
                           <Link
                              href="/login"
                              variant="body2"
                              sx={{ alignSelf: 'center' }}
                           >
                              Giriş Yap
                           </Link>
                        </span>
                     </Typography>
                  </Form>
               )}
            </Formik>
            <Divider>
               <Typography sx={{ color: 'text.secondary' }}>veya</Typography>
            </Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
               <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => alert('Sign up with Google')}
                  startIcon={<GoogleIcon />}
               >
                  Google ile kayıt ol
               </Button>
            </Box>
         </MuiCard>
      </SignUpContainer>
   )
}
