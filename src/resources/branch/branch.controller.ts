// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Branchs Resources For Stable Work
import BranchService from '@/resources/branch/branch.service';

// Create Client Controller
class BranchController implements Controller {
    // Base path
    public path = '/admin/branchs';
    public router = Router();
    // Connect Branch Service
    private BranchService = new BranchService();

    constructor() {
        // Initialize Routes For Admin Branchs API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Необходимо добавить регистрацию и логин для Администраторов и Инструкторов

        // @route    POST http://localhost:8000/api/admin/branchs/create-branch
        // @desc     Create a New Branch
        // @access   Private
        this.router.post(
            `${this.path}/create-branch`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.create
        );

        // @route    GET http://localhost:8000/api/admin/branchs/all
        // @desc     Get all branchs
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getBranchs
        );

        // @route    GET http://localhost:8000/api/admin/branchs/:branch_id
        // @desc     Get branch by ID
        // @access   Private
        this.router.get(
            `${this.path}/:branch_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getBranchById
        );

        // @route    POST http://localhost:8000/api/admin/branchs/searching/all
        // @desc     Search Branchs
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.findBranchs
        );

        // @route    PUT http://localhost:8000/api/admin/branchs/update/:branch_id
        // @desc     Update Information For branch by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:branch_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.updateBranch
        );

        // @route    DELETE http://localhost:8000/api/admin/branchs/:branch_id
        // @desc     Delete branch by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:branch_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.deleteBranch
        );
    }

    // @route    POST http://localhost:8000/api/admin/branchs/create-branch
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
                name,
                typeRent,
                priceRent,

                // Additional Data
                comment,
            } = req.body;
            
            // Generating a token using a User Service Register
            // Attaching data received from the request
            const data = await this.BranchService.create(
                // Required Data
                name,
                typeRent,
                priceRent,

                // Additional Data
                comment,
            );
            
            // In case of successful token generation, 
            // we return to the User a token with which the User will be 
            // able to Log in to the System.
            res.status(201).json({ data });
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/branchs/all
    // @desc     Get all branchs
    // @access   Private
    private getBranchs = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Work Branch Service
            const branchsData = await this.BranchService.getBranchs();
            
            // In case of successful then send 201 Status
            res.status(201).json(branchsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/branchs/:branch_id
    // @desc     Get branch by ID
    // @access   Private
    private getBranchById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const userId = req.params.branch_id;
            
            // Work Branch Service
            const branchData = await this.BranchService.getBranchById(userId);
            
            // In case of successful then send 201 Status
            res.status(201).json(branchData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/branchs/searching/all
    // @desc     Search Branchs
    // @access   Private
    private findBranchs = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work Branch Service
            const branchsData = await this.BranchService.findBranchs(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(branchsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:8000/api/admin/branchs/update/:branch_id
    // @desc     Update Information For branch by ID
    // @access   Private
    private updateBranch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                // Required Data
                name,
                typeRent,
                priceRent,

                // Additional Data
                comment,
            } = req.body;

            const branchId = req.params.branch_id;
            
            // Work Branch Service
            const branchData = await this.BranchService.updateBranch(
                branchId,
                // Required Data
                name,
                typeRent,
                priceRent,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(branchData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    DELETE http://localhost:8000/api/admin/branchs/:branch_id
    // @desc     Delete branch by ID
    // @access   Private
    private deleteBranch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const branchId = req.params.branch_id;
            
            // Work Branch Service
            const branchData = await this.BranchService.deleteBranch(
                branchId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(branchData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default BranchController;
