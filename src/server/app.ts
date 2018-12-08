import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as path from 'path';
import { Router } from './controllers/index';

class App {

    public app: express.Application;
    public router: Router = new Router();

    constructor() {
        this.app = express();
        this.config();
        this.router.routes(this.app);
    }
    private config(): void {
        this.app.disable('x-powered-by');
        this.app.use(helmet());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, '../../dist')));
    }
}

export default new App().app;
