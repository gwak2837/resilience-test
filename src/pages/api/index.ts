import type { NextApiRequest, NextApiResponse } from 'next'

function HelloWorld(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send('hello world')
}

export default HelloWorld
