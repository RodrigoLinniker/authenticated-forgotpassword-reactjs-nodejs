import { Router } from 'express'; 
import { ForgotPasswordController } from './controllers/ForgotPasswordController';
import  {SessionsController}  from "./controllers/SessionsController";
import { UsersController } from './controllers/UsersController';
const router = Router();

const  sessionsController = new  SessionsController();
const forgotPasswordController = new ForgotPasswordController();
const usersController = new UsersController();

router.post('/login', sessionsController.create);

router.post('/reset-password', forgotPasswordController.forgotPassword);
router.get('/reset-password/:token', forgotPasswordController.verify);
router.post('/new-password', forgotPasswordController.resetPassword);

router.post('/users', usersController.create)


export default router;