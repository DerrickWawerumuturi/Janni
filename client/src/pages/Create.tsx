import Tiptap from '../components/Editor.tsx'
import { createBlog, getBlog, updateBlog } from '../database.ts'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isAdmin } from '../lib/auth.ts'
import type { Blog } from '../types.ts'



const Create = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [existingImage, setExistingImage] = useState<string | null>(null)
  const navigate = useNavigate()

  const { id } = useParams()
  const isEditing = Boolean(id)

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    if (!id) return

    const fetchBlog = async () => {
      const blog: Blog = await getBlog(Number(id))
      setTitle(blog.title)
      setContent(blog.content)
      setExistingImage(blog.image_url)
    }

    fetchBlog()
  }, [id])

  useEffect(() => {
    if (isEditing) return

    const timeout = setTimeout(() => {
      const draft = { title, content }
      localStorage.setItem('blog_draft', JSON.stringify(draft))
    }, 500)

    return () => clearTimeout(timeout)
  }, [title, content, isEditing])

  useEffect(() => {
    if (isEditing) return

    const savedDraft = localStorage.getItem('blog_draft')
    if (savedDraft) {
      const parsedDraft: any = JSON.parse(savedDraft)

      setTitle(parsedDraft.title || '')
      setContent(parsedDraft.content || '')
    }
  }, [isEditing])

  const handlePublish = async () => {
    try {
      if (isEditing) {
        await updateBlog(
          Number(id),
          { title, content },
          thumbnail
        )

        navigate(`/blogs/${id}`)
      } else {
        await createBlog({ title, content }, thumbnail)
        navigate('/')
      }
    } catch (err) {
      console.error(err)

    }
  }


  return (
    <div className={'flex flex-col gap-8 py-7 mb-0 md:mb-16'}>
      <div className={'flex flex-row gap-2'}>
        <button
          className={
            'hover:underline hover:cursor-pointer hover:underline-offset-6'
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
          Create
        </button>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-start h-full w-full lg:w-3xl md:w-5xl pt-2 md:pt-5  gap-3 ">
        <div className={'flex flex-col w-full gap-5 mt-3'}>
          <input
            type="text"
            value={title}
            placeholder="Title..."
            className={'text-xl md:text-3xl font-bold outline-none mb-4'}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <Tiptap onChange={setContent} content={content} />
          </div>

          <label
            htmlFor="thumbnail"
            className="relative w-87.5 md:w-200 lg:w-full h-28 md:h-56 rounded-xl overflow-hidden cursor-pointer border border-gray-200"
          >
            {thumbnail ? (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : existingImage ? (
              <img
                src={existingImage}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition">
                Upload thumbnail
              </div>
            )}

            {thumbnail && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                Change
              </div>
            )}
          </label>

          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setThumbnail(e.target.files[0])
              }
            }}
          />
        </div>

        {isAdmin() && (
          <div>
            <button
              className={
                'rounded-2xl bg-green-800 p-3 text-green-50 hover:cursor-pointer text-sm z-150 fixed bottom-5 right-5'
              }
              onClick={handlePublish}
            >
              {isEditing ? 'Update' : 'Post'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Create
