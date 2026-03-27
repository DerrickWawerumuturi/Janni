import { supabase } from '../../client/src/lib/supabase.ts'


export default async function handler(req:any, res:any) {
  const { id } = req.query

  // GET one blog
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return res.status(500).json({ error })

    return res.json(data)
  }

  // UPDATE blog
  if (req.method === 'PUT') {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data: userData } = await supabase.auth.getUser(token)

    if (!userData?.user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const { title, content, image_url } = req.body

    const { data, error } = await supabase
      .from('blogs')
      .update({
        title,
        content,
        ...(image_url && { image_url }),
      })
      .eq('id', id)
      .select()

    if (error) return res.status(500).json({ error })

    return res.json(data[0])
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
