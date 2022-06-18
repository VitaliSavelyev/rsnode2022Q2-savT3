import {Request, Response} from '../interfaces/interfaces'

export const parseJson = (_req: Request, res: Response, pid: number) => {
    res.send = (data, statusCode) => {
        res.writeHead(statusCode, {'Content-Type': 'application/json', 'processID': pid || 'processID'});
        res.end(JSON.stringify(data));
    }
}
