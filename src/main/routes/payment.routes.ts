import { Router } from 'express';
import { PaymentController } from '../../modules/payment/controller/payment.controller';

const router = Router();

router.post('/create-payment-intent', PaymentController.createPaymentIntent);

export default router;
