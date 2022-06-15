import {Request, Response} from '../interfaces/interfaces';

export const getUrlId = (req: Request, _res: Response) => {
  if(req.url){
    const pathId = req.url.split('/');
    if (pathId.length === 3 && pathId[2]) {
      req.urlId = pathId[2];
      req.url = '/person/:id';
    }
  }
}
