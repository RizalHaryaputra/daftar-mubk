// import midtransClient from 'midtrans-client';

export const createSnapTransaction = async (orderId: string, grossAmount: number, customerDetails: any) => {
  // Mocking Midtrans Snap API call
  console.log('Mocking Midtrans Snap API for', orderId, grossAmount);
  return {
    token: 'mock-snap-token-123456',
    redirect_url: 'https://app.midtrans.com/snap/v2/vtweb/mock-snap-token-123456'
  };
};
