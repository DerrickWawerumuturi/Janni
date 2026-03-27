import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Blog } from '../types.ts'
import { getAllBlogs } from '../database.ts'
import BlogCard from '../components/blogCard.tsx'

const Explore = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  useEffect(() => {
    const fetchAll = async () => {
      const blogs = await getAllBlogs()
      setBlogs(blogs)
    }
    fetchAll()
  }, [blogs])
  
  return (
    <div className={'flex flex-col gap-8 pl-0 md:pl-7 mb-16'}>
      <div className={'flex flex-row gap-2'}>
        <button
          className={
            'hover:underline hover:cursor-pointer hover:underline-offset-6 hover:text-blue-400'
          }
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <p>&gt;</p>
        <button
          className={
            'text-blue-400 hover:cursor-pointer hover:underline hover:underline-offset-6'
          }
        >
          Explore
        </button>
      </div>
      <div className={'flex flex-col gap-10'}>
        {blogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
export default Explore
