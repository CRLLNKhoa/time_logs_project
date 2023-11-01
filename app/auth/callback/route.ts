import { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query
  if (code) {
    const supabase = createPagesServerClient({ req, res })
    try {
      await supabase.auth.exchangeCodeForSession(String(code))
      res.redirect('/')
    } catch (e) {
      console.error('Failed to exchange code for session:', e)
      res.redirect('/auth')
    }
  } else {
    res.redirect('/auth')
  }
}

export default handler