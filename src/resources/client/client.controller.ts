// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Clients Resources For Stable Work
import ClientService from '@/resources/client/client.service';

// Create Client Controller
class ClientController implements Controller {
    // Base path
    public path = '/clients';
    public router = Router();
    // Connect Client Service
    private ClientService = new ClientService();

    constructor() {
        // Initialize Routes For Admin Clients API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Необходимо добавить регистрацию и логин для Администраторов и Инструкторов

        // @route    POST http://localhost:8000/api/admin/clients/create-client
        // @desc     Create a New Client
        // @access   Private
        this.router.post(
            `${this.path}/create-client`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.create
        );

        // @route    GET http://localhost:8000/api/admin/clients/all
        // @desc     Get all clients
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getClients
        );

        // @route    GET http://localhost:8000/api/admin/clients/:client_id
        // @desc     Get client by ID
        // @access   Private
        this.router.get(
            `${this.path}/:client_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getClientById
        );

        // @route    POST http://localhost:8000/api/admin/clients/searching/all
        // @desc     Search Clients
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.findClients
        );

        // @route    PUT http://localhost:8000/api/admin/clients/update/:client_id
        // @desc     Update Information For client by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:client_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.updateClient
        );

        // @route    DELETE http://localhost:8000/api/admin/clients/:client_id
        // @desc     Delete client by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:client_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.deleteClient
        );
    }

    // @route    POST http://localhost:8000/api/admin/clients/create-client
    // @desc     Create a New Client
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
                fullname,
                branch,
                group,
                dateBirth,
                clientStatus,

                // Optional Data
                firstName,
                firstPhoneNumber,
                secondName,
                secondPhoneNumber,
                gender,
                weight,
                gip,
                rank,
                certificateFrom,
                insuranceUpTo,
                athletePassport,
                userId,

                // Additional Data
                comment,
            } = req.body;
            
            // Generating a token using a User Service Register
            // Attaching data received from the request
            const data = await this.ClientService.create(
                // Required Data
                fullname,
                branch,
                group,
                dateBirth,
                clientStatus,

                // Optional Data
                firstName,
                firstPhoneNumber,
                secondName,
                secondPhoneNumber,
                gender,
                weight,
                gip,
                rank,
                certificateFrom,
                insuranceUpTo,
                athletePassport,
                userId,

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

    // @route    GET http://localhost:8000/api/admin/clients/all
    // @desc     Get all clients
    // @access   Private
    private getClients = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Work Client Service
            const clientsData = await this.ClientService.getClients();
            
            // In case of successful then send 201 Status
            res.status(201).json(clientsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/clients/:client_id
    // @desc     Get client by ID
    // @access   Private
    private getClientById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const userId = req.params.client_id;
            
            // Work Client Service
            const clientData = await this.ClientService.getClientById(userId);
            
            // In case of successful then send 201 Status
            res.status(201).json(clientData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/clients/searching/all
    // @desc     Search Clients
    // @access   Private
    private findClients = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work Client Service
            const clientsData = await this.ClientService.findClients(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(clientsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:8000/api/admin/clients/update/:client_id
    // @desc     Update Information For client by ID
    // @access   Private
    private updateClient = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                // Required Data
                fullname,
                branch,
                group,
                dateBirth,
                clientStatus,

                // Optional Data
                firstName,
                firstPhoneNumber,
                secondName,
                secondPhoneNumber,
                gender,
                weight,
                gip,
                rank,
                certificateFrom,
                insuranceUpTo,
                athletePassport,
                userId,

                // Additional Data
                comment,
            } = req.body;

            const clientId = req.params.client_id;
            
            // Work Client Service
            const clientData = await this.ClientService.updateClient(
                clientId,
                // Required Data
                fullname,
                branch,
                group,
                dateBirth,
                clientStatus,

                // Optional Data
                firstName,
                firstPhoneNumber,
                secondName,
                secondPhoneNumber,
                gender,
                weight,
                gip,
                rank,
                certificateFrom,
                insuranceUpTo,
                athletePassport,
                userId,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(clientData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    DELETE http://localhost:8000/api/admin/clients/:client_id
    // @desc     Delete client by ID
    // @access   Private
    private deleteClient = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const clientId = req.params.client_id;
            
            // Work Client Service
            const clientData = await this.ClientService.deleteClient(
                clientId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(clientData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default ClientController;
