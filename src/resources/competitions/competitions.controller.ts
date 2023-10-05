// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Competitions Resources For Stable Work
import CompetitionsService from '@/resources/competitions/competitions.service';

// Create Competitions Controller
class CompetitionsController implements Controller {
    // Base path
    public path = '/admin/competitions';
    public router = Router();
    // Connect Competitions Service
    private CompetitionsService = new CompetitionsService();

    constructor() {
        // Initialize Routes For Admin Competitions API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Необходимо добавить регистрацию и логин для Администраторов и Инструкторов

        // @route    POST http://localhost:8000/api/admin/competitions/create-сompetitions
        // @desc     Create a New Competitions
        // @access   Private
        this.router.post(
            `${this.path}/create-competitions`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.create
        );

        // @route    GET http://localhost:8000/api/admin/competitions/all
        // @desc     Get all Competitions
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCompetitions
        );

        // @route    GET http://localhost:8000/api/admin/competitions/:competitions_id
        // @desc     Get Competitions by ID
        // @access   Private
        this.router.get(
            `${this.path}/:competitions_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCompetitionsById
        );

        // @route    GET http://localhost:8000/api/admin/competitions/students/:competitions_id
        // @desc     Get Competitions Students by ID
        // @access   Private
        this.router.get(
            `${this.path}/students/:competitions_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCompetitionsStudentsById
        );

        // @route    POST http://localhost:8000/api/admin/competitions/add-students/:competitions_id
        // @desc     Add students to competitions by ID
        // @access   Private
        this.router.post(
            `${this.path}/add-students/:competitions_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.addStudents
        );

        // @route    POST http://localhost:8000/api/admin/competitions/searching/all
        // @desc     Search Competitions
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.findCompetitions
        );

        // @route    PUT http://localhost:8000/api/admin/competitions/update/:competitions_id
        // @desc     Update Information For Competitions by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:competitions_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.updateCompetitions
        );

        // @route    DELETE http://localhost:8000/api/admin/competitions/:competitions_id
        // @desc     Delete Competitions by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:competitions_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.deleteCompetitions
        );
    }

    // @route    POST http://localhost:8000/api/admin/competitions/create-сompetitions
    // @desc     Create a New Competitions
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
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            } = req.body;
            
            // Work Competitions Service
            const data = await this.CompetitionsService.create(
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            );

            res.status(201).json({ data });
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/competitions/all
    // @desc     Get all Competitions
    // @access   Private
    private getCompetitions = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Work Competitions Service
            const competitionsData = await this.CompetitionsService.getCompetitions();
            
            // In case of successful then send 201 Status
            res.status(201).json(competitionsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/competitions/:competitions_id
    // @desc     Get Competitions by ID
    // @access   Private
    private getCompetitionsById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const competitionsId = req.params.competitions_id;
            
            // Work Competitions Service
            const competitionsData = await this.CompetitionsService.getCompetitionsById(competitionsId);
            
            // In case of successful then send 201 Status
            res.status(201).json(competitionsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/competitions/students/:competitions_id
    // @desc     Get Competitions Students by ID
    // @access   Private
    private getCompetitionsStudentsById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const competitionsId = req.params.competitions_id;
            
            // Work Competitions Service
            const competitionsStudentsData = await this.CompetitionsService.getCompetitionsStudentsById(competitionsId);
            
            // In case of successful then send 201 Status
            res.status(201).json(competitionsStudentsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/competitions/add-students/:competitions_id
    // @desc     Add students to competitions by ID
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
                disciplines,

                // Additional Data
                comment,
            } = req.body;

            // Getting data from a request
            const competitionsId = req.params.competitions_id;
            
            // Work Competitions Service
            const competitionsData = await this.CompetitionsService.addStudents(
                competitionsId,
                // Required Data
                client,
                disciplines,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(competitionsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/competitions/searching/all
    // @desc     Search Competitions
    // @access   Private
    private findCompetitions = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work Competitions Service
            const competitionsData = await this.CompetitionsService.findCompetitions(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(competitionsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:8000/api/admin/competitions/update/:competitions_id
    // @desc     Update Information For Competitions by ID
    // @access   Private
    private updateCompetitions = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            } = req.body;

            const competitionsId = req.params.competitions_id;
            
            // Work Competitions Service
            const competitionsData = await this.CompetitionsService.updateCompetitions(
                competitionsId,
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(competitionsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    DELETE http://localhost:8000/api/admin/competitions/:competitions_id
    // @desc     Delete Competitions by ID
    // @access   Private
    private deleteCompetitions = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const competitionsId = req.params.competitions_id;
            
            // Work Competitions Service
            const competitionsData = await this.CompetitionsService.deleteCompetitions(
                competitionsId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(competitionsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default CompetitionsController;
