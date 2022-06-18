import * as dotenv from 'dotenv';
import {ServerCustom} from './server'
import {parseJson} from './middleware/parseJson';
import {bodyParser} from './middleware/bodyParser';
import {getUrlId} from './middleware/getUrlId';
import {router} from './data/user/user-router';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const { PORT } = process.env

const server = new ServerCustom();

server.addMiddleware(parseJson);
server.addMiddleware(getUrlId);
server.addMiddleware(bodyParser);
server.addRouter(router);

server.listen(PORT || '4000', function () {
    console.log('Server is running...');
})

export = server
