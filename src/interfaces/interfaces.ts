import {ServerResponse, IncomingMessage} from "http";

export interface UserInt {
    id?: string;
    username: string;
    age: number;
    hobbies: string[];
}
export interface RouterInt {
    endpoints: ConstantsString
}

export interface ConstantsString {
    [kew: string]: string | Handler;
}

export interface Handler {
    (req: Request, res: Response): void;
}

export interface Response extends ServerResponse {
    send?: Send;
}

export interface Send {
    (data: UserInt[] | UserInt | CustomError | string, err: number): void;
}

export interface CustomError {
    message: string
}

export interface Request extends IncomingMessage {
    urlId?: string;
    body?: any;
}
