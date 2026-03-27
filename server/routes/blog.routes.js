import express from 'express'
import { db, requireAuth } from '../lib/supabase.js'
import multer from 'multer'


const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })


//all blogs
router.get('/', async (req, res) => {
  try {
    const { data, error } = await db
      .from("blogs")
      .select("*")
      .order("created_at", {ascending: false})

    if (error) {
      console.error(error)
    }

    res.json(data)

  } catch (e) {
    console.error(e)
  }
})


// get specific blog
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await db
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single()

    if (error) console.log(error)

    res.json(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE blog
router.post('/', upload.single('thumbnail'), requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body
    const file = req.file

    let imageUrl = null

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`

      const { data, error } = await db.storage
        .from('blog-images')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        })

      if (error) console.log(error)

      const { data: publicUrl } = db.storage
        .from('blog-images')
        .getPublicUrl(fileName)

      imageUrl = publicUrl.publicUrl
    }

    const { data, error } = await db
      .from('blogs')
      .insert({
        title,
        content,
        image_url: imageUrl,
      })
      .select()

    if (error) console.log(error)

    res.json(data[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})


router.put('/:id', upload.single('thumbnail'),requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const file = req.file

    let imageUrl = null

    // if new image uploaded
    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`

      const { error: uploadError } = await db.storage
        .from('blog-images')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        })

      if (uploadError) console.log(uploadError)

      const { data: publicUrl } = db.storage
        .from('blog-images')
        .getPublicUrl(fileName)

      imageUrl = publicUrl.publicUrl
    }


    const { data, error } = await db
      .from('blogs')
      .update({
        title,
        content,
        ...(imageUrl && { image_url: imageUrl }),
      })
      .eq('id', id)
      .select()

    if (error) console.log(error)

    res.json(data[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
export default router;