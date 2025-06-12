'use server'

import 'server-only'
import { type QueryData } from '@supabase/supabase-js'
import { createClient } from './server'

export const getComments = async (postId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('comments')
    .select('id, text, user_id, users:users!comments_user_id_fkey(email)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return null
  }

  return data
}

export const getHomePosts = () => {
  const supabase = createClient()

  return supabase
    .from('posts')
    .select('id, title, slug, users("email")')
    .order('created_at', { ascending: false })
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>
export type PostCommentsType = Awaited<ReturnType<typeof getComments>>