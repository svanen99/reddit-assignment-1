'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { commentSchema } from './schemas'

export const createComment = async ({
  data,
}: {
  data: z.infer<typeof commentSchema>
}) => {

  const parsedData = commentSchema.parse(data)

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('not authenticated')
  }

  const { error } = await supabase.from('comments').insert([
    {
      post_id: parsedData.postId,
      text: parsedData.text,
      user_id: user.id,
    },
  ])
  if (error) {
    throw new Error(error.message)
  }

  const { data: post } = await supabase
    .from('posts')
    .select('slug')
    .eq('id', parsedData.postId)
    .single()

  if (!post) {
    throw new Error('Post not found')
  }

  revalidatePath(`/post/${post.slug}`)
}
