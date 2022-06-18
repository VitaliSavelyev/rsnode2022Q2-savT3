import * as dotenv from 'dotenv';
import {ServerCustom} from './server'
import {parseJson} from './middleware/parseJson';
import {bodyParser} from './middleware/bodyParser';
import {getUrlId} from './middleware/getUrlId';
import {router} from './data/user/user-router';
import cluster from 'cluster';
import path from 'path';
import os from 'os';

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const {PORT} = process.env

const server = new ServerCustom();
server.addMiddleware(parseJson);
server.addMiddleware(getUrlId);
server.addMiddleware(bodyParser);
server.addRouter(router);

const pid: number = process.pid;

if (cluster.isPrimary) {
    console.log(`MasterPid: ${pid}`)
    const count = os.cpus().length;
    for (let i = 0; i < count; i++) {
        cluster.fork()
    }
} else {
    let id: number | undefined;
    if (cluster.worker) {
        id = cluster.worker.id
    }
    console.log(`workerID: ${id}, pid: ${pid}, PORT: ${PORT}`)
    server.listen(PORT || '3000', function () {
        console.log('Server is running...');
    }, pid)
}
