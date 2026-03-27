import type { Blog } from '../types.ts'
import { parseTime, stripHtml } from '../lib/helper_func.ts'
import { useNavigate } from 'react-router-dom'

const FeaturedCard = ({blog}: {blog: Blog}) => {
  const navigate = useNavigate()

  return (
    <div
      className={
        'w-full grid sm:grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-12 h-25 lg:h-62.5 hover:cursor-pointer '
      }
      onClick={() => navigate(`/blogs/${blog.id}`)}
    >
      <div className={'col-span-2 w-full h-full'}>
        <img
          src={blog.image_url}
          alt={blog.title}
          className={'w-full h-full object-cover'}
        />
      </div>
      <div className={'col-span-1 w-full h-full'}>
        <div className={'flex flex-col gap-1 lg:gap-2'}>
          <h2
            className={
              'text-2xl lg:text-5xl font-extrabold hover:underline hover:underline-offset-4 cursor-pointer tracking-tight md:tracking-normal'
            }
          >
            {blog.title}
          </h2>
          <p className={'text-sm font-thin text-gray-500 pb-2'}>
            {parseTime(blog.created_at)}
          </p>
          <p className="text-sm text-gray-500 line-clamp-4 md:line-clamp-3">
            {stripHtml(blog.content)}
          </p>
        </div>
      </div>
    </div>
  )
}
export default FeaturedCard
