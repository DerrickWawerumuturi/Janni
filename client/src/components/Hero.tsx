import { useEffect, useState } from 'react'
import { getAllBlogs } from '../database.ts'
import type { Blog } from '../types.ts'
import BlogCard from './blogCard.tsx'
import FeaturedCard from './featuredCard.tsx'



const Hero = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const featuredBlog: Blog | undefined = blogs[0]
  const otherBlogs: Blog[] = blogs.slice(1)


  useEffect(() => {
    const fetchBlogs =  async () => {
      try {
        const blogs = await getAllBlogs()
        console.log('Fetching blogs...', blogs)
        setBlogs(blogs)
      } catch (e) {
        console.error(e)
      }
    }

    fetchBlogs()
  }, [])


  return (
      <div className="max-w-7xl py-8 grid grid-rows-2 md:grid-rows-3 gap-16 md:gap-0">
        <div className={"row-span-1 md:row-span-2"}>
          {featuredBlog && <FeaturedCard blog={featuredBlog} />}
        </div>
        <div className="flex flex-col gap-2 row-span-1">
          {otherBlogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
  )
}
export default Hero
