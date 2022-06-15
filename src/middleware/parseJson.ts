import {Request, Response} from '../interfaces/interfaces'

export const parseJson = (_req: Request, res: Response) => {
  res.send = (data, statusCode) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }
}
