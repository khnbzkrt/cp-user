'use client'

import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteAccessTokenToCookie } from '../actions'

export default function Home() {
   const router = useRouter()
   return (
      <main>
         <Link href={'/register'}>Register</Link>
         <blockquote>
            (Login kullanıcı için çalışmayacak. Çünkü login olan bir kullanıcı
            /register ve /login sayfalarına tekrar erişememeli)
         </blockquote>

         <Button
            variant="text"
            onClick={async () => {
               await deleteAccessTokenToCookie()
               router.push('/login')
            }}
         >
            Çıkış Yap
         </Button>
      </main>
   )
}
