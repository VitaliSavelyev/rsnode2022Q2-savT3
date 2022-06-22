import {Request, Response} from '../interfaces/interfaces';
import {ERROR_MESSAGE, HTTP_STATUS_CODE} from "../constants/constants";
import {validate} from "uuid";

export const getUrlId = (req: Request, res: Response) => {
    if (req.url && res.send) {
        const pathId = req.url.split('/');
        if (pathId.length === 3 && pathId[2]) {
            req.urlId = pathId[2];
            if (pathId[1] !== 'users') {
                req.url = ''
                res.send(ERROR_MESSAGE.NOT_FOUND.PAGE(), HTTP_STATUS_CODE.ERROR.NOT_FOUND);
            } else {
                if (!validate(req.urlId)) {
                    res.send(ERROR_MESSAGE.BAD_REQUEST.VALID_ID(req.urlId), HTTP_STATUS_CODE.ERROR.BAD_REQUEST);
                }
                req.url = '/users/:id';
            }
        } else {
            if(pathId.length > 2) {
                req.url = ''
                res.send(ERROR_MESSAGE.NOT_FOUND.PAGE(), HTTP_STATUS_CODE.ERROR.NOT_FOUND);
            }
        }
    }
}
