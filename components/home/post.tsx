import Link from 'next/link'

export const HomePost = ({
  author,
  title,
  slug,
}: {
  author: string
  title: string
  slug: string
}) => {
  return (
    <Link
      href={`/post/${slug}`}
      className='flex w-full flex-col rounded-3xl border-2 border-[#fa5639] p-6'
    >
      <span className='font-bold text-md p-2'>{author}</span>
      <h2 className='text-lg font-bold m-2'>{title}</h2>
    </Link>
  )
}