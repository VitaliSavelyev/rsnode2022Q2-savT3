import * as dotenv from 'dotenv';
import {Server} from './server'
import {parseJson} from './middleware/parseJson';
import {bodyParser} from './middleware/bodyParser';
import {getUrlId} from './middleware/getUrlId';
import {router} from './data/user/user-router';

dotenv.config();

const server = new Server();

server.addMiddleware(parseJson);
server.addMiddleware(getUrlId);
server.addMiddleware(bodyParser);
server.addRouter(router);

server.listen(3001, () => {
    console.log('Server is running...');
})
