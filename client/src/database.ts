import api from './lib/api.ts'
import type { Blog } from './types.ts'
import { supabase } from './lib/supabase.ts'

export const getAllBlogs = async (): Promise<Blog[]> => {
  const res = await api.get('/blogs')
  return res.data
}

export const getBlog = async (id: number) => {
  const res = await api.get(`/blogs/${id}`)
  return res.data
}

export const createBlog = async (data: any, thumbnail?: File | null) => {
  let image_url = null

  // 🧠 Step 1: upload image FIRST
  if (thumbnail) {
    const fileName = `${Date.now()}-${thumbnail.name}`

    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, thumbnail)

    if (error) throw error

    const { data: publicUrl } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName)

    image_url = publicUrl.publicUrl
  }

  // 🧠 Step 2: send JSON (NOT FormData)
  const res = await api.post('/blogs', {
    title: data.title,
    content: data.content,
    image_url,
  })

  return res.data
}

export const updateBlog = async (id: number, data: any, file?: File | null) => {
  let image_url = data.image_url || null

  // upload new image if provided
  if (file) {
    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file)

    if (error) throw error

    const { data: publicUrl } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName)

    image_url = publicUrl.publicUrl
  }

  const res = await api.put(`/blogs/${id}`, {
    title: data.title,
    content: data.content,
    image_url,
  })

  return res.data
}