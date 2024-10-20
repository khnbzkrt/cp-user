import { Metadata } from 'next'
import RegisterForm from '@/components/auth/register-form'

export const metadata: Metadata = {
   title: 'Kayıt Ol',
   description: 'SMM Yorum Uygulaması'
}

export default function RegisterPage() {
   return <RegisterForm />
}
