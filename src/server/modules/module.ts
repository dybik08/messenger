import { Application } from 'express';
import { IController } from '../interfaces/controller.interface';
import UsersController from './users/users.controller';
import ConversationsController from './conversations/conversations.controller';

export class Router {
    private controllers: Array<IController> = [
        new UsersController('/api/users'),
        new ConversationsController('/api/conversations')
    ];

    public routes(app: Application): void {
        this.controllers.forEach(controller => {
            app.use(controller.route, controller.router);
        })
    }
}
