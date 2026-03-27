import { supabase } from '../../client/src/lib/supabase.ts'

export default async function handler(req: any, res:any) {
  // GET all blogs
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ error })

    return res.json(data)
  }

  // CREATE blog
  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data: userData, error: userError } =
      await supabase.auth.getUser(token)

    if (!userData?.user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    if (userError) {console.log(userError.message)}

    const { title, content, image_url } = req.body

    const { data, error } = await supabase
      .from('blogs')
      .insert({ title, content, image_url })
      .select()

    if (error) return res.status(500).json({ error })

    return res.json(data[0])
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
