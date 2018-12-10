import { Application } from 'express';
import { IController } from '../interfaces/controller.interface';
import UsersController from './users/users.controller';

export class Router {
    private controllers: Array<IController> = [
        new UsersController('/api/users'),
    ];

    public routes(app: Application): void {
        this.controllers.forEach(controller => {
            app.use(controller.route, controller.router);
        })
    }
}
