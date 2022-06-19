import {EventEmitter} from 'events';
import {Router} from './data/router';
import * as http from 'http';
import {IncomingMessage, Server, ServerResponse} from 'http';
import {ERROR_MESSAGE, HTTP_STATUS_CODE} from './constants/constants';
import {Request, Response} from './interfaces/interfaces'

export class ServerCustom {
    private middleware: Function[];

    private server: Server;

    private emitter: EventEmitter;

    pid: number;

    constructor() {
        this.emitter = new EventEmitter;
        this.server = this._createServer();
        this.middleware = [];
        this.pid = 0;
    }

    private _createServer() {
        return http.createServer((request: IncomingMessage, response: ServerResponse) => {
            const res: Response = response;
            const req: Request = request;
            this.middleware.forEach(middleware => middleware(req, res, this.pid));
            if (res.send) {
                try {
                    req.on('end', () => {
                        if (res.send && req.method) {
                            const needCheckValid = (req.method === 'POST' || req.method === 'PUT') && req.body && (!req.body?.age || !req.body?.hobbies || !req.body?.username);
                            if (needCheckValid) {
                                res.send(ERROR_MESSAGE.BAD_REQUEST.VALID_ELEM(), HTTP_STATUS_CODE.ERROR.BAD_REQUEST);
                            } else {
                                if(this._checkTypeField(req.body)){
                                    res.send(ERROR_MESSAGE.BAD_REQUEST.VALID_TYPE_ELEM(), HTTP_STATUS_CODE.ERROR.BAD_REQUEST);
                                } else {
                                    if (req.url) {
                                        const emitted = this.emitter.emit(this._getRouterMask(req.url, req.method), req, res);
                                        if (!emitted) {
                                            res.send(ERROR_MESSAGE.NOT_FOUND.PAGE(), HTTP_STATUS_CODE.ERROR.NOT_FOUND);
                                        }
                                    }
                                }
                            }
                        }
                    })
                } catch (err) {
                    res.send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR(), HTTP_STATUS_CODE.ERROR.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }

    public addRouter(router: Router): void {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method];
                this.emitter.on(this._getRouterMask(path, method), (req, res) => {
                    handler(req, res);
                })
            })
        })
    }

    public addMiddleware(middleware: any): void {
        this.middleware.push(middleware);
    }

    private _getRouterMask(path: string, method: string): string {
        return `${path}:${method}`;
    }

    private _checkTypeField(body: any): boolean {
        return typeof body?.age !== "number" || typeof body?.username !== "string" ||
            body.hobbies.some((elem: any) => typeof elem !== "string");
    }

    public listen(port: string, callback: any, pid?:number): void {
     if (pid) {
         this.pid = pid
     }
        this.server.listen(port, callback);
    }

    public close():void {
        this.server.close();
    }
}
