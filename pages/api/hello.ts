// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'

type Data = {
  name: string
}

const handler: NextApiHandler<Data> = (req, res) => {
  res.status(200).json({ name: 'John Doe' })

  if (req.method === 'POST') {
    res.setHeader("Allow", 'POST').status(405).send(req.body);
    return;
  }

  res.status(200).json(req.body)
}

export default handler