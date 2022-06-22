import { Router} from '../router';
import { HTTP_STATUS_CODE, ERROR_MESSAGE } from '../../constants/constants'
import {Response, UserInt, Request} from "../../interfaces/interfaces";
import {getAllUsers, getUserById, createUser, deleteUser, updateUser} from "./user-service";

const router = new Router();

router.get('/users', async (_req: Request, res: Response) => {
    if (res.send) {
        try {
            const users: UserInt[] = await getAllUsers();
            res.send(users, HTTP_STATUS_CODE.COMPLETE.OK);
        } catch (err) {
            res.send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR(), HTTP_STATUS_CODE.ERROR.INTERNAL_SERVER_ERROR);
        }
    }
})
router.get('/users/:id', async (req: Request, res:Response) => {
    if(req.urlId && res.send){
    try {
            const user: UserInt | null = await getUserById(req.urlId);
            if(user) {
                res.send(user, HTTP_STATUS_CODE.COMPLETE.OK);
            } else {
                res.send(ERROR_MESSAGE.NOT_FOUND.ELEM_ID(req.urlId), HTTP_STATUS_CODE.ERROR.NOT_FOUND);
            }
        }
    catch (err) {
        res.send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR(), HTTP_STATUS_CODE.ERROR.INTERNAL_SERVER_ERROR);
    }
    }
})

router.post('/users', async (req: Request, res: Response) => {
    if(res.send) {
        try {
            const user: UserInt = {
                username: req.body.username,
                age: req.body.age,
                hobbies: req.body.hobbies,
            }
            const newUser: UserInt = await createUser(user);
            res.send(newUser, HTTP_STATUS_CODE.COMPLETE.CREATED);
        } catch (err) {
            res.send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR(), HTTP_STATUS_CODE.ERROR.INTERNAL_SERVER_ERROR);
        }
    }
})
router.put('/users/:id', async (req:Request, res:Response) => {
    if(req.urlId && res.send) {
        try {
            const updatedUser: UserInt | null = await updateUser(req.body, req.urlId)
            if (updatedUser) {
                res.send(updatedUser, HTTP_STATUS_CODE.COMPLETE.OK);
            } else {
                res.send(ERROR_MESSAGE.NOT_FOUND.ELEM_ID(req.urlId), HTTP_STATUS_CODE.ERROR.NOT_FOUND);
            }
        } catch (err) {
            res.send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR(), HTTP_STATUS_CODE.ERROR.INTERNAL_SERVER_ERROR);
        }
    }
})
router.delete('/users/:id', async(req: Request, res:Response) => {
    if(req.urlId && res.send) {
        try {
            const deletedUser = await deleteUser(req.urlId);
            if (deletedUser) {
                res.send('', HTTP_STATUS_CODE.COMPLETE.NO_CONTENT);
            } else {
                res.send(ERROR_MESSAGE.NOT_FOUND.ELEM_ID(req.urlId), HTTP_STATUS_CODE.ERROR.NOT_FOUND);
            }
        } catch (err) {
            res.send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR(), HTTP_STATUS_CODE.ERROR.INTERNAL_SERVER_ERROR);
        }
    }
})

export { router };
