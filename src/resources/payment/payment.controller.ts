// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Transactions Resources For Stable Work
import TransactionModel from '@/resources/transaction/transaction.model';

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

        // @route    GET http://localhost:5000/api/payments/last-order
        // @desc     Get Last Order
        // @access   Public
        this.router.get(
            `${this.path}/last-order`,
            this.getLastOrder
        );

        // @route    GET http://localhost:5000/api/payments/order/:transaction_id
        // @desc     et Transaction ID
        // @access   Public
        this.router.get(
            `${this.path}/transaction/:transaction_id`,
            this.getOrderId
        );

        // @route    GET http://localhost:5000/api/payments/success-orders
        // @desc     Get Successfully Orders
        // @access   Public
        this.router.get(
            `${this.path}/success-orders`,
            this.getSuccessfullyOrders
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
            const resp = await acquiring.register(req.body.orderNumber, req.body.amount, req.body.description);

            await TransactionModel.create({
                transactionId: resp.orderId,
                amount: req.body.amount,
                description: req.body.description
            });

            return res.status(200).json(resp);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            console.log(error);
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
    // @desc     et Transaction ID
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
                        status: paymentInfo?.errorMessage
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

    // @route    GET http://localhost:5000/api/payments/success-orders
    // @desc     Get Successfully Orders
    // @access   Public
    async getSuccessfullyOrders(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const orders = await TransactionModel.find({ status: "Успешно" });

            return res.status(200).json(orders);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }

    }

}

export default PaymentController;
