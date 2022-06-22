import { ERROR_MESSAGE, HTTP_STATUS_CODE } from '../constants/constants';
import {Request, Response} from '../interfaces/interfaces';

export const bodyParser = (req: Request, res: Response) => {
  let body = '';

  req.on('readable', () => {
    let chunk;
    while ((chunk = req.read()) !== null) {
      body += chunk.toString();
    }
    if (body) {
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        if(res.send) {
          res.send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR(), HTTP_STATUS_CODE.ERROR.INTERNAL_SERVER_ERROR);
        }
      }
    }
  })
}
