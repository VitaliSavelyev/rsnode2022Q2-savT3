// import * as url from 'url';
import { Handler, RouterInt } from '../interfaces/interfaces';

export class Router implements RouterInt {
    public endpoints: any

    constructor() {
        this.endpoints = {};
    }

    createEndpoint(method: string, path: string, handler: Handler): void {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }
        const endpoint = this.endpoints[path];
        endpoint[method] = handler;
    }

    // _checkPatch(path: string) {
    //     const queryObj = url.parse(path, true).pathname.split('/');
    //     return queryObj.slice(1)[1];
    // }

    public get(path: string, handler: Handler ): void {
        return this.createEndpoint("GET", path, handler);
    }

    public put(path: string, handler: Handler): void {
        return this.createEndpoint("PUT", path, handler);
    }

    public post(path: string, handler: Handler): void {
        return this.createEndpoint("POST", path, handler);
    }

    public delete(path: string, handler: Handler): void {
        return this.createEndpoint("DELETE", path, handler);
    }

}
