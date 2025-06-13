import Link from 'next/link'
import { LogInForm } from './form'

export default function LogInPage() {
  return (
    <main className='main mt-[20vh] flex grow flex-col items-center'>
      <div className='flex w-full grow flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold'>welcome back</h1>
        <LogInForm />
      </div>
      <Link href='/auth/sign-up' className='text-black'>
        don&apos;t have an account? sign up here!
      </Link>
    </main>
  )
}