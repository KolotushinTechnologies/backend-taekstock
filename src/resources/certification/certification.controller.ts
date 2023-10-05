// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Certification Resources For Stable Work
import CertificationService from '@/resources/certification/certification.service';

// Create Certification Controller
class CertificationController implements Controller {
    // Base path
    public path = '/admin/certifications';
    public router = Router();
    // Connect Certification Service
    private CertificationService = new CertificationService();

    constructor() {
        // Initialize Routes For Admin Certifications API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Необходимо добавить регистрацию и логин для Администраторов и Инструкторов

        // @route    POST http://localhost:8000/api/admin/certifications/create-certification
        // @desc     Create a New Certification
        // @access   Private
        this.router.post(
            `${this.path}/create-certification`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.create
        );

        // @route    GET http://localhost:8000/api/admin/certifications/all
        // @desc     Get all Certifications
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCertifications
        );

        // @route    GET http://localhost:8000/api/admin/certifications/:certification_id
        // @desc     Get Certification by ID
        // @access   Private
        this.router.get(
            `${this.path}/:certification_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCertificationById
        );

        // @route    GET http://localhost:8000/api/admin/certifications/students/:certification_id
        // @desc     Get Certification Students by ID
        // @access   Private
        this.router.get(
            `${this.path}/students/:certification_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getCertificationStudentsById
        );

        // @route    POST http://localhost:8000/api/admin/certifications/add-students/:certification_id
        // @desc     Add students to certification by ID
        // @access   Private
        this.router.post(
            `${this.path}/add-students/:certification_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.addStudents
        );

        // @route    POST http://localhost:8000/api/admin/certifications/searching/all
        // @desc     Search Certifications
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.findCertifications
        );

        // @route    PUT http://localhost:8000/api/admin/certifications/update/:certification_id
        // @desc     Update Information For Certification by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:certification_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.updateCertification
        );

        // @route    DELETE http://localhost:8000/api/admin/certifications/:certification_id
        // @desc     Delete Certification by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:certification_id`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.deleteCertification
        );
    }

    // @route    POST http://localhost:8000/api/admin/certifications/create-certification
    // @desc     Create a New Certification
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
            
            // Work Certification Service
            const data = await this.CertificationService.create(
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

    // @route    GET http://localhost:8000/api/admin/certifications/all
    // @desc     Get all Certifications
    // @access   Private
    private getCertifications = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Work Certification Service
            const certificationsData = await this.CertificationService.getCertifications();
            
            // In case of successful then send 201 Status
            res.status(201).json(certificationsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/certifications/:certification_id
    // @desc     Get Certification by ID
    // @access   Private
    private getCertificationById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const certificationId = req.params.certification_id;
            
            // Work Certification Service
            const certificationsData = await this.CertificationService.getCertificationById(certificationId);
            
            // In case of successful then send 201 Status
            res.status(201).json(certificationsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:8000/api/admin/certifications/students/:certification_id
    // @desc     Get Certification Students by ID
    // @access   Private
    private getCertificationStudentsById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const certificationId = req.params.certification_id;
            
            // Work Certification Service
            const certificationStudentsData = await this.CertificationService.getCertificationStudentsById(certificationId);
            
            // In case of successful then send 201 Status
            res.status(201).json(certificationStudentsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/certifications/add-students/:certification_id
    // @desc     Add students to certification by ID
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
                gipFrom,
                gipTo,

                // Additional Data
                comment,
            } = req.body;

            // Getting data from a request
            const certificationId = req.params.certification_id;
            
            // Work Group Service
            const certificationData = await this.CertificationService.addStudents(
                certificationId,
                // Required Data
                client,
                gipFrom,
                gipTo,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(certificationData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:8000/api/admin/certifications/searching/all
    // @desc     Search Certifications
    // @access   Private
    private findCertifications = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work Certification Service
            const certificationsData = await this.CertificationService.findCertifications(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(certificationsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:8000/api/admin/certifications/update/:certification_id
    // @desc     Update Information For Certification by ID
    // @access   Private
    private updateCertification = async (
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

            const certificationId = req.params.certification_id;
            
            // Work Certification Service
            const certificationsData = await this.CertificationService.updateCertification(
                certificationId,
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(certificationsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    DELETE http://localhost:8000/api/admin/certifications/:certification_id
    // @desc     Delete Certification by ID
    // @access   Private
    private deleteCertification = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const certificationId = req.params.certification_id;
            
            // Work Certification Service
            const certificationsData = await this.CertificationService.deleteCertification(
                certificationId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(certificationsData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default CertificationController;
