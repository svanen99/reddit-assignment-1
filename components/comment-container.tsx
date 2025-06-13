'use client'
import React, { useState } from 'react'
import { Button } from './button'
import { CreateCommentForm } from '@/app/(main)/create-comment/form'
import { CommentComponent } from './comment-component'
import { PostCommentsType } from '@/utils/supabase/queries'

type CommentData = {
  comment: NonNullable<PostCommentsType>[number]
  isPostAuthor: boolean
  isCommentAuthor: boolean
}

export const CommentContainer = ({
  postId,
  data,
}: {
  postId: string
  data: CommentData[] | undefined
}) => {
  const [active, toggleActive] = useState(false)

  return (
    <div className='p-5 text-lg rounded-2xl '>
      <Button onClick={() => toggleActive(!active)}>
        {active ? 'Close' : 'Comments'}
      </Button>
      {active ? <CreateCommentForm postId={postId} /> : null}
      {data &&
        data.map(({ comment, isCommentAuthor, isPostAuthor }) => (
          <CommentComponent
            key={comment.id}
            isCommentAuthor={isCommentAuthor}
            isPostAuthor={isPostAuthor}
            {...comment}
          />
        ))}
    </div>
  )
}