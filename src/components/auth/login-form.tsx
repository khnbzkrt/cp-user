'use client'

import * as React from 'react'
import {
   Box,
   Button,
   Card,
   Checkbox,
   Divider,
   FormControl,
   FormControlLabel,
   FormLabel,
   Link,
   Stack,
   TextField,
   Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { FacebookIcon, GoogleIcon, SitemarkIcon } from './custom-icons'


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

export default function LoginForm() {
   const [emailError, setEmailError] = React.useState(false)
   const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
   const [passwordError, setPasswordError] = React.useState(false)
   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (emailError || passwordError) {
         event.preventDefault()
         return
      }
      const data = new FormData(event.currentTarget)
      console.log({
         email: data.get('email'),
         password: data.get('password')
      })
   }

   const validateInputs = () => {
      const email = document.getElementById('email') as HTMLInputElement
      const password = document.getElementById('password') as HTMLInputElement

      let isValid = true

      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
         setEmailError(true)
         setEmailErrorMessage('Please enter a valid email address.')
         isValid = false
      } else {
         setEmailError(false)
         setEmailErrorMessage('')
      }

      if (!password.value || password.value.length < 6) {
         setPasswordError(true)
         setPasswordErrorMessage('Password must be at least 6 characters long.')
         isValid = false
      } else {
         setPasswordError(false)
         setPasswordErrorMessage('')
      }

      return isValid
   }

   return (
      <SignInContainer direction="column" justifyContent="space-between">
         <MuiCard variant="outlined">
            <SitemarkIcon />
            <Typography
               component="h1"
               variant="h4"
               sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
               Sign in
            </Typography>
            <Box
               component="form"
               onSubmit={handleSubmit}
               noValidate
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2
               }}
            >
               <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                     error={emailError}
                     helperText={emailErrorMessage}
                     id="email"
                     type="email"
                     name="email"
                     placeholder="your@email.com"
                     autoComplete="email"
                     autoFocus
                     required
                     fullWidth
                     variant="outlined"
                     color={emailError ? 'error' : 'primary'}
                     sx={{ ariaLabel: 'email' }}
                  />
               </FormControl>
               <FormControl>
                  <Box
                     sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                     <FormLabel htmlFor="password">Password</FormLabel>
                  </Box>
                  <TextField
                     error={passwordError}
                     helperText={passwordErrorMessage}
                     name="password"
                     placeholder="••••••"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     autoFocus
                     required
                     fullWidth
                     variant="outlined"
                     color={passwordError ? 'error' : 'primary'}
                  />
               </FormControl>
               <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
               >
                  Sign in
               </Button>
               <Typography sx={{ textAlign: 'center' }}>
                  Don&apos;t have an account?{' '}
                  <span>
                     <Link
                        href="/register"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                     >
                        Sign up
                     </Link>
                  </span>
               </Typography>
            </Box>
            <Divider>or</Divider>
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
            </Box>
         </MuiCard>
      </SignInContainer>
   )
}
