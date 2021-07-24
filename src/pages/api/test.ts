import type { NextApiRequest, NextApiResponse } from 'next'
import { questions } from './questions/[id]'

export type Response = {
  length: number
}

function Test(req: NextApiRequest, res: NextApiResponse<Response>) {
  res.status(200).json({ length: questions.length })
}

export default Test
