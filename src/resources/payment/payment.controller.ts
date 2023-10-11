// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Transactions Resources For Stable Work
import TransactionModel from '@/resources/transaction/transaction.model';

// Import Users Resources For Stable Work
import UserModel from '@/resources/user/user.model';

import Acquiring from 'sberbank-acquiring';

const acquiring = new Acquiring(
    {
        userName: 'greefon-api',
        password: 'Greefon1.'
    },
    'https://google.com'
);

// Create Payment Controller
class PaymentController implements Controller {
    // Base path
    public path = '/payments';
    public router = Router();
    // Connect Product Service
    // private ProductService = new ProductService();

    constructor() {
        // Initialize Routes For Payments API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        // @route    POST http://localhost:5000/api/payments/send-form
        // @desc     Send Form
        // @access   Public
        this.router.post(
            `${this.path}/send-form`,
            this.register
        );

        // @route    GET http://localhost:5000/api/payments/user-transactions
        // @desc     Get User Transactions
        // @access   Private
        this.router.get(
            `${this.path}/user-transactions`,
            authenticated,
            this.getUserTransactions
        );

        // @route    GET http://localhost:5000/api/payments/last-order
        // @desc     Get Last Order
        // @access   Public
        this.router.get(
            `${this.path}/last-order`,
            this.getLastOrder
        );

        // @route    GET http://localhost:5000/api/payments/order/:transaction_id
        // @desc     Get Transaction ID
        // @access   Public
        this.router.get(
            `${this.path}/transaction/:transaction_id`,
            this.getOrderId
        );

        // @route    GET http://localhost:5000/api/payments/transactions
        // @desc     Get All Transactions
        // @access   Public
        this.router.get(
            `${this.path}/transactions`,
            authenticated,
            roleMiddleware(['Instructor','SuperAdmin']),
            this.getAllTransactions
        );
    }

    // @route    POST http://localhost:5000/api/payments/send-form
    // @desc     Send Form
    // @access   Public
    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { userId, userStatus, paymentPlace } = req.body;

            const resp = await acquiring.register(req.body.orderNumber, req.body.amount, req.body.description);

            const transaction = await TransactionModel.create({
                fullname: req.body.fullname,
                type: req.body.type,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                coach: req.body.coach,
                transactionId: resp.orderId,
                amount: req.body.amount,
                description: req.body.description,
                status: 'В обработке'
            });

            if (paymentPlace == 'Личный кабинет спортсмена') {
                await TransactionModel.findOneAndUpdate(
                    { _id: transaction._id },
                    {
                        $set: {
                            userId: userId,
                            userStatus: userStatus,
                            paymentPlace: paymentPlace
                        }
                    },
                    { new: true }
                );
            }

            return res.status(200).json(resp);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            console.log(error);
            next(new HttpException(400, error.message));
        }

    }

    // @route    GET http://localhost:5000/api/payments/user-transactions
    // @desc     Get User Transactions
    // @access   Private
    async getUserTransactions(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.user.id;

            const userExists = await UserModel.findOne({ _id: userId });

            if (!userExists) {
                return next(new HttpException(404, 'No logged in user'));
            }

            const transactions = await TransactionModel.find({ userId: userExists._id });

            if (!transactions) {
                throw new Error('Transactions not found!');
            }

            return res.status(200).json(transactions);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    }

    // @route    GET http://localhost:5000/api/payments/last-order
    // @desc     Get Last Order
    // @access   Public
    async getLastOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const orders = await TransactionModel.find();

            if (!orders) {
                return res.status(404).json('Orders Not Found!');
            }

            let lastOrder = orders[orders.length - 1];

            return res.status(200).json(lastOrder);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }

    }

    // @route    POST http://localhost:5000/api/payments/transaction/:transaction_id
    // @desc     Get Transaction ID
    // @access   Public
    async getOrderId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const transactionId = req.params.transaction_id;

            const paymentInfo = await acquiring.get(transactionId);

            await TransactionModel.findOneAndUpdate(
                { transactionId: transactionId },
                {
                    $set: {
                        status: paymentInfo?.paymentAmountInfo?.paymentState == 'DEPOSITED' ? 'Успешно' : 'Ожидание ответа'
                    }
                },
                { new: true },
            );

            return res.status(200).json(paymentInfo);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }

    }

    // @route    GET http://localhost:5000/api/payments/transactions
    // @desc     Get All Transactions
    // @access   Public
    async getAllTransactions(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const orders = await TransactionModel.find();

            return res.status(200).json(orders);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }

    }

}

export default PaymentController;
