import { NextApiRequest, NextApiResponse } from 'next';
import { googleService } from '../../service/google-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = req.body;
    const r = await googleService.send(params);
    res.status(200).json({ message: 'Success', r });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
