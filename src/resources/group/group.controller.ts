// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Groups Resources For Stable Work
import GroupService from '@/resources/group/group.service';

// Create Group Controller
class GroupController implements Controller {
    // Base path
    public path = '/admin/groups';
    public router = Router();
    // Connect Group Service
    private GroupService = new GroupService();

    constructor() {
        // Initialize Routes For Admin Groups API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Необходимо добавить регистрацию и логин для Администраторов и Инструкторов

        // @route    POST http://localhost:8000/api/admin/groups/create-group
        // @desc     Create a New Branch
        // @access   Private
        this.router.post(
            `${this.path}/create-group`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.create
        );

        // @route    GET http://localhost:8000/api/admin/groups/all
        // @desc     Get all Groups
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getGroups
        );

        // @route    GET http://localhost:8000/api/admin/groups/:group_id
        // @desc     Get Group by ID
        // @access   Private
        this.router.get(
            `${this.path}/:group_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getGroupById
        );

        // @route    POST http://localhost:8000/api/admin/groups/searching/all
        // @desc     Search Groups
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.findGroups
        );

        // @route    PUT http://localhost:8000/api/admin/groups/update/:group_id
        // @desc     Update Information For Group by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:group_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.updateGroup
        );

        // @route    DELETE http://localhost:8000/api/admin/groups/:group_id
        // @desc     Delete Group by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:group_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.deleteGroup
        );
    }

    // @route    POST http://localhost:8000/api/admin/groups/create-group
    // @desc     Create a New Branch
    // @access   Private
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                // Required Data
                branch,
                name,
                coach,
                timetable,
                potential,

                // Additional Data
                comment,
            } = req.body;
            
            // Work Group Service
            const data = await this.GroupService.create(
                branch,
                name,
                coach,
                timetable,
                potential,

                // Additional Data
                comment,
            );

            res.status(201).json({ data });
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/groups/all
    // @desc     Get all Groups
    // @access   Private
    private getGroups = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Work Group Service
            const groupsData = await this.GroupService.getGroups();
            
            // In case of successful then send 201 Status
            res.status(201).json(groupsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/groups/:group_id
    // @desc     Get Group by ID
    // @access   Private
    private getGroupById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const groupId = req.params.group_id;
            
            // Work Group Service
            const groupData = await this.GroupService.getGroupById(groupId);
            
            // In case of successful then send 201 Status
            res.status(201).json(groupData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/groups/searching/all
    // @desc     Search Groups
    // @access   Private
    private findGroups = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work Group Service
            const groupsData = await this.GroupService.findGroups(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(groupsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:8000/api/admin/groups/update/:group_id
    // @desc     Update Information For Group by ID
    // @access   Private
    private updateGroup = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                branch,
                name,
                coach,
                timetable,
                potential,

                // Additional Data
                comment,
            } = req.body;

            const groupId = req.params.group_id;
            
            // Work Group Service
            const groupData = await this.GroupService.updateGroup(
                groupId,
                branch,
                name,
                coach,
                timetable,
                potential,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(groupData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    DELETE http://localhost:8000/api/admin/groups/:group_id
    // @desc     Delete Group by ID
    // @access   Private
    private deleteGroup = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const groupId = req.params.group_id;
            
            // Work Group Service
            const groupData = await this.GroupService.deleteGroup(
                groupId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(groupData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default GroupController;
