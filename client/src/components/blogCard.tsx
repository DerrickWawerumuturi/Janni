import type { Blog } from '../types'
import { stripHtml } from '../lib/helper_func.ts'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate()

  const goToBlog = async (id: number) => {
    try {
      navigate(`/blogs/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      className="bg-white overflow-hidden transition cursor-pointer grid grid-cols-2 md:grid-cols-3 gap-px md:gap-2"
      onClick={() => goToBlog(blog.id)}
    >
      {blog.image_url && (
        <div className="h-48 w-full overflow-hidden col-span-1">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-2 col-span-1 md:col-span-2">
        <h2 className="text-md md:text-lg font-semibold line-clamp-2 hover:underline hover:underline-offset-4 ">
          {blog.title}
        </h2>

        <p className="text-xs md:text-sm text-gray-600 line-clamp-3 hover:underline hover:underline-offset-4 ">
          {stripHtml(blog.content)}
        </p>
      </div>
    </div>
  )
}

export default BlogCard
