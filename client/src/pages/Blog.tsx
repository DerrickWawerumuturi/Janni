import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlog } from '../database.ts'
import type { Blog } from '../types'
import { parseTime } from '../lib/helper_func.ts'
import { isAdmin } from '../lib/auth.ts'

const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return


    const fetchBlog = async () => {
      console.log('Fetching blog...')
      try {
        const data = await getBlog(Number(id))
        setBlog(data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchBlog()
  }, [id])

  if (!blog) return <div>Loading...</div>

  return (
    <div className={'flex flex-col gap-8 sm:pl-0 md:pl-7 mb-16'}>
      <div className={'flex justify-between'}>
        <div className={'flex flex-row justify-center items-center gap-2'}>
          <button
            className={
              'hover:underline hover:cursor-pointer hover:underline-offset-6 hover:text-blue-400'
            }
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <p>&gt;</p>
          {isAdmin() && (
            <button
              className={
                'text-blue-400 hover:cursor-pointer hover:underline hover:underline-offset-6'
              }
            >
              Create
            </button>
          )}
        </div>
        <div>
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="rounded-2xl bg-green-800 p-3 text-green-50 hover:cursor-pointer text-sm z-150 sticky"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="w-full max-w-full py-4 md:py-8">
        <h1 className="text-3xl font-bold mb-8 md:mb-16">{blog.title}</h1>

        {blog.image_url && (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-fit object-cover mb-5 md:mb-10"
          />
        )}

        <p className={'text-sm font-thin text-gray-500 pb-5'}>
          {parseTime(blog.created_at)}
        </p>

        <div
          className="ProseMirror w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  )
}

export default BlogDetail
