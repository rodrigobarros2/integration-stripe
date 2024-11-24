import { Request, Response } from 'express';
import Stripe from 'stripe';
import env from '../../../main/config/env';
import { HttpCode } from '../../../constants/httpCode.enum';

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: '2024-11-20.acacia',
});

export class PaymentController {
  static async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { amount, currency } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      res.status(HttpCode.OK).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
