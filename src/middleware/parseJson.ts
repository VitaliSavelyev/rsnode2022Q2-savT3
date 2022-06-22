import {CustomError, Request, Response, UserInt} from '../interfaces/interfaces'

export const parseJson = (_req: Request, res: Response, pid: number) => {
    res.send = (data: UserInt[] | UserInt | CustomError | string, statusCode: number) => {
        res.writeHead(statusCode, {'Content-Type': 'application/json', 'processID': pid || 'processID'});
        res.end(JSON.stringify(data));
    }
}
