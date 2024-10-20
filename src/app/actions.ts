'use server'

import { cookies } from 'next/headers'

export async function setAccessTokenToCookie(accessToken: string) {
   const cookie = cookies()

   cookie.set('access_token', accessToken)
}

export async function deleteAccessTokenToCookie() {
   const cookie = cookies()

   cookie.delete('access_token')
}
