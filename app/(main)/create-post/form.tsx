'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { postSchema } from '@/actions/schemas'
import { createPost } from '@/actions/create-post'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const createPostSchema = postSchema

export const CreatePostForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: createPost,
    onError: (error) => toast.error(error.message),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutate({
          title: values.title,
          content: values.content,
                })
      })}
      className='flex w-full flex-col gap-4'
    >
      <Input {...register('title')} label='title' error={errors.title} />
      <Textarea
        {...register('content')}
        label='content'
        error={errors.content}
      />
      <Button type='submit'>{isPending ? 'uploading post...' : 'post'}</Button>
      {error && <p className='text-primary'>{error.message}</p>}
    </form>
  )
}