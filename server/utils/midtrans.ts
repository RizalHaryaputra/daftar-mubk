// @ts-expect-error - midtrans-client does not have TypeScript definitions
import midtransClient from 'midtrans-client';

export const createSnapTransaction = async (orderId: string, grossAmount: number, customerDetails: any, itemDetails?: any[]) => {
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

  const snap = new midtransClient.Snap({
    isProduction,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
  });

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount
    },
    customer_details: customerDetails,
    item_details: itemDetails
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return {
      token: transaction.token,
      redirect_url: transaction.redirect_url
    };
  } catch (error: any) {
    console.error('Midtrans Snap Error:', error);
    throw new Error(error.message || 'Gagal membuat transaksi Midtrans');
  }
};
