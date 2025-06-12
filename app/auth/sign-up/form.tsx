'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { signUp } from '@/actions/sign-up'
import { signUpSchema } from '@/actions/schemas'
import { Button } from '@/components/button'
import { Input } from '@/components/input'



export const SignUpForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: signUp,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  })

  return(
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full max-w-md flex-col gap-4'
    >
      <Input {...register('email')} label='email' error={errors.email} />
      <Input
        {...register('password')}
        type='password'
        label='password'
        error={errors.password}
      />
      <Button type='submit' disabled={isPending}>
        {isPending ? 'Checking the books...' : 'Sign up'}
      </Button>
      {error && <p className='text-primary'>{error.message}</p>}
    </form>
  )
  
  
}