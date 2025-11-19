import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllDocs } from '../../lib/docs'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const docs = getAllDocs()
  res.status(200).json(docs)
}
