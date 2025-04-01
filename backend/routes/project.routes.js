import {Router} from 'express';
import * as projectController from '../controllers/project.controller.js';
import {body} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router=Router()

router.post('/create', 
    authMiddleware.authUser,
    body('name').isString().withMessage('Name must be a String'),
    body('prompt').isString().withMessage('Prompt must be a String'),
    body('tech_stack').isString().withMessage('Tech Stack must be a String'),
    projectController.createProject
)

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProjects
)

router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectById
)

export default router
