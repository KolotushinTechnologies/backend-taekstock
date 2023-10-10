// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Camps Resources For Stable Work
import CampService from '@/resources/camps/camps.service';

// Create Camp Controller
class CampController implements Controller {
    // Base path
    public path = '/admin/camps';
    public router = Router();
    // Connect Camp Service
    private CampService = new CampService();

    constructor() {
        // Initialize Routes For Admin Camps API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Необходимо добавить регистрацию и логин для Администраторов и Инструкторов

        // @route    POST http://localhost:8000/api/admin/camps/create-camp
        // @desc     Create a New Camp
        // @access   Private
        this.router.post(
            `${this.path}/create-camp`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.create
        );

        // @route    GET http://localhost:8000/api/admin/camps/all
        // @desc     Get all Camps
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCamps
        );

        // @route    GET http://localhost:8000/api/admin/camps/:camp_id
        // @desc     Get Camp by ID
        // @access   Private
        this.router.get(
            `${this.path}/:camp_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCampById
        );

        // @route    GET http://localhost:8000/api/admin/camps/students/:camp_id
        // @desc     Get Camp Students by ID
        // @access   Private
        this.router.get(
            `${this.path}/students/:camp_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCampStudentsById
        );

        // @route    POST http://localhost:8000/api/admin/camps/add-students/:camp_id
        // @desc     Add students to camp by ID
        // @access   Private
        this.router.post(
            `${this.path}/add-students/:camp_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.addStudents
        );

        // @route    POST http://localhost:8000/api/admin/camps/searching/all
        // @desc     Search Camps
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.findCamps
        );

        // @route    PUT http://localhost:8000/api/admin/camps/update/:camp_id
        // @desc     Update Information For Camp by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:camp_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.updateCamp
        );

        // @route    DELETE http://localhost:8000/api/admin/camps/:camp_id
        // @desc     Delete Camp by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:camp_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.deleteCamp
        );
    }

    // @route    POST http://localhost:8000/api/admin/camps/create-camp
    // @desc     Create a New Camp
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
                name,

                // Additional Data
                comment,
            } = req.body;
            
            // Work Camp Service
            const data = await this.CampService.create(
                // Required Data
                name,

                // Additional Data
                comment,
            );

            res.status(201).json({ data });
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/camps/all
    // @desc     Get all Camps
    // @access   Private
    private getCamps = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Work Camp Service
            const campsData = await this.CampService.getCamps();
            
            // In case of successful then send 201 Status
            res.status(201).json(campsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/camps/:camp_id
    // @desc     Get Camp by ID
    // @access   Private
    private getCampById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const campId = req.params.camp_id;
            
            // Work Camp Service
            const campsData = await this.CampService.getCampById(campId);
            
            // In case of successful then send 201 Status
            res.status(201).json(campsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/camps/students/:camp_id
    // @desc     Get Camp Students by ID
    // @access   Private
    private getCampStudentsById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const campId = req.params.camp_id;
            
            // Work Camp Service
            const campStudentsData = await this.CampService.getCampStudentsById(campId);
            
            // In case of successful then send 201 Status
            res.status(201).json(campStudentsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/camps/add-students/:camp_id
    // @desc     Add students to camp by ID
    // @access   Private
    private addStudents = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                // Required Data
                client,
                externalClient,
                dateBirth,
                phoneNumber,

                // Additional Data
                comment,
            } = req.body;

            // Getting data from a request
            const campId = req.params.camp_id;
            
            // Work Group Service
            const campData = await this.CampService.addStudents(
                campId,
                // Required Data
                client,
                externalClient,
                dateBirth,
                phoneNumber,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(campData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/camps/searching/all
    // @desc     Search Camps
    // @access   Private
    private findCamps = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work Camp Service
            const campsData = await this.CampService.findCamps(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(campsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:8000/api/admin/camps/update/:camp_id
    // @desc     Update Information For Camp by ID
    // @access   Private
    private updateCamp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                // Required Data
                name,

                // Additional Data
                comment,
            } = req.body;

            const campId = req.params.camp_id;
            
            // Work Camp Service
            const campsData = await this.CampService.updateCamp(
                campId,
                // Required Data
                name,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(campsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    DELETE http://localhost:8000/api/admin/camps/:camp_id
    // @desc     Delete Camp by ID
    // @access   Private
    private deleteCamp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const campId = req.params.camp_id;
            
            // Work Camp Service
            const campsData = await this.CampService.deleteCamp(
                campId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(campsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default CampController;
