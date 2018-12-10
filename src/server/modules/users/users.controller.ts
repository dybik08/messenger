import { Application, Router, Request, Response } from 'express';
import { IController } from '../../interfaces/controller.interface';
import { catchExceptions } from '../../middleware/exceptions';
import UsersService from './users.service';
import User from './users.model';

class UsersController implements IController {
    private _route: string;
    private _router: Router = Router();

    constructor(route: string) {
        this._route = route;
        this.configure();
    }

    private configure() {
        this._router.get(
            '/',
            catchExceptions(async (req: Request, res: Response) => {
                const users = await UsersService.getUsers();
                res.status(200).json(users);
            })
        );
        this._router.get(
            '/:id',
            catchExceptions(async (req: Request, res: Response) => {
                const user = await UsersService.getUserById(req.params.id);
                res.status(200).json(user);
            })
        );
        this._router.post(
            '/',
            catchExceptions(async (req: Request, res: Response) => {
                const user = new User(req.body);
                const savedUser = await UsersService.saveUser(user);
                res.status(200).json(savedUser);
            })
        )
    }
    get route(): string {
        return this._route;
    }
    get router(): Router {
        return this._router;
    }
}

export default UsersController;
